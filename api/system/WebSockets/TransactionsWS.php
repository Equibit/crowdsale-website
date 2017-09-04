<?php
namespace WebSockets;

use \Ratchet\MessageComponentInterface;
use \Ratchet\ConnectionInterface;
use \React\EventLoop\LoopInterface;
use \PHP_REST_API\Models\NotificationsModel;

class TransactionsWS implements MessageComponentInterface {
    protected $clients;
    private $connectedUsers;
    private $subscribedUserNames;

    public function __construct(LoopInterface $loop) {
        $this->clients = new \SplObjectStorage;
        $this->subscribedUserNames = [];

        $loop->addPeriodicTimer(300, function() {
            foreach ($this->subscribedUserNames as $key => $userName) {
                $notifications = new NotificationsModel($userName);
                if (!empty($data = $notifications->getUnseenNotifications())) {
                    $this->connectedUsers[$key]->send(json_encode($data));
                }
            }
        });
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        $this->connectedUsers [$conn->resourceId] = $conn;

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $payload = new WsPayload($msg, '/notifications', true);
        if ($payload->isValid()) {
            if ($payload->getSubscription()) {
                $this->subscribedUserNames[$from->resourceId] = $payload->getUserName();
                $this->connectedUsers[$from->resourceId]->send('{"subscribed":true}');
            } else {
                $this->subscribedUserNames[$from->resourceId] = null;
                unset($this->subscribedUserNames[$from->resourceId]);
                $this->connectedUsers[$from->resourceId]->send('{"subscribed":false}');
            }
        } else {
            $this->connectedUsers[$from->resourceId]->send('{"error":"Notifications require signed payload"}');
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        $this->subscribedUserNames[$conn->resourceId] = null;
        unset($this->subscribedUserNames[$conn->resourceId]);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}