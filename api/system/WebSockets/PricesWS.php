<?php
namespace WebSockets;

use \Ratchet\MessageComponentInterface;
use \Ratchet\ConnectionInterface;
use \React\EventLoop\LoopInterface;
use \PHP_REST_API\Models\BNCAPIModel;

class PricesWS implements MessageComponentInterface {
    protected $clients;
    private $connectedUsers;
    private $subscribedUserNames;

    public function __construct(LoopInterface $loop) {
        $this->clients = new \SplObjectStorage;
        $this->subscribedUserNames = [];

        $loop->addPeriodicTimer(60, function() {

            echo "Running Timer!\n";

            if (!empty($this->subscribedUserNames)) {
                $temp = new BNCAPIModel();
                $temp->storePrices(300);

                $prices2Send = $temp->getPrices();

                foreach ($this->subscribedUserNames as $key => $userName) {
                    $this->connectedUsers[$key]->send(json_encode($prices2Send));
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
        $payload = new WsPayload($msg, '/prices', true);
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
            $this->connectedUsers[$from->resourceId]->send('{"error":"Prices require signed payload"}');
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