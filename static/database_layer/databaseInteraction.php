<?Php

class Database{
    public $connection = null;
    function __construct($servername, $username, $dbname, $password){
        try {
            $this->connection = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

        // Insert a row/s in a Database Table
        public function Insert( $statement = "" , $parameters = [] ){
            try{

                $this->executeStatement( $statement , $parameters );
                return $this->connection->lastInsertId();

            }catch(Exception $e){
                throw new Exception($e->getMessage());
            }
        }

        // Select a row/s in a Database Table
        public function Select( $statement = "" , $parameters = [] ){
            try{

                $stmt = $this->executeStatement( $statement , $parameters );
                return $stmt->fetchAll();

            }catch(Exception $e){
                throw new Exception($e->getMessage());
            }
        }

        // Update a row/s in a Database Table
        public function Update( $statement = "" , $parameters = [] ){
            try{

                $this->executeStatement( $statement , $parameters );

            }catch(Exception $e){
                throw new Exception($e->getMessage());
            }
        }

        // Remove a row/s in a Database Table
        public function Remove( $statement = "" , $parameters = [] ){
            try{

                $this->executeStatement( $statement , $parameters );

            }catch(Exception $e){
                throw new Exception($e->getMessage());
            }
        }

        // execute statement
        private function executeStatement( $statement = "" , $parameters = [] ){
            try{

                $stmt = $this->connection->prepare($statement);
                $stmt->execute($parameters);
                return $stmt;

            }catch(Exception $e){
                throw new Exception($e->getMessage());
            }
        }
        public function lastInsertId() {
            return $this->connection->lastInsertId();
        }
}

