<?php
namespace WebSockets;

use \Ratchet\MessageComponentInterface;
use \Ratchet\ConnectionInterface;
use \React\EventLoop\LoopInterface;

class Chat implements MessageComponentInterface {
    protected $clients;
    private $connectedUsers;
    private $subscribedUserNames;

    public function __construct(LoopInterface $loop) {
        $this->clients = new \SplObjectStorage;
        $this->subscribedUserNames = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        $this->connectedUsers [$conn->resourceId] = $conn;

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $payload = new WsPayload($msg, '/chat', true);
        $this->subscribedUserNames[$from->resourceId] = $payload->getUserName();
        if ($payload->isValid()) {
            $numRecv = count($this->clients) - 1;
            echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
                , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

            foreach ($this->clients as $client) {
                $obj = $payload->getPayload();
                $obj['dateTime'] = time();
                $client->send(json_encode($obj));
            }
        } else {
            $this->connectedUsers[$from->resourceId]->send('{"error":"chat require signed payload"}');
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $msg = '{"action": "left", "username": "' . $this->subscribedUserNames[$conn->resourceId] . '", "dateTime": ' . time() . '}';
        $this->clients->detach($conn);
        $this->subscribedUserNames[$conn->resourceId] = null;
        unset($this->subscribedUserNames[$conn->resourceId]);

        foreach ($this->clients as $client) {
            $client->send($msg);
        }

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}