<?php
class db_setting{
 public $server = "192.168.0.46";
 public $dbname = "maxbuk_db2";
 public $user = "root";
 public $password = "root";
 
 public function __construct($host, $user, $pass, $base){
	$this->server = $host;
	$this->user   = $user;
	$this->password = $pass;
	$this->dbname =$base;
 }
}

class db{
	private $con = false; 
	private $Queryes = 0; 
	private $MySQLErrors = array(); 
	private $TimeQuery = 100; 
	private $MaxExTime = 0; 
	private $ListQueryes = ""; 
	private $HardQuery = ""; 
	private $LastQuery = false; 
	private $ConnectData = array();
	
	public function __construct($host, $user, $pass, $base){
		#set_time_limit(15);
		$this->Connect($host, $user, $pass, $base);
		$this->query("SET NAMES 'cp1251'");
		$this->query("SET CHARACTER SET 'cp1251'");
	}
	function __destruct(){
		
		if( !count($this->MySQLErrors) ) mysqli_close($this->con);
	
	}
  private function trace(){
    echo "[" .  gettype($this->query). "]<br/>";
    echo "mysql error :" .  mysqli_error($this->cnn);
    exit();
  }
	private function Connect($host, $user, $pass, $base){
		$this->con =  @mysqli_connect($host, $user, $pass, $base) 
		   or $this->GetError(mysqli_connect_error());
	} 
	private function GetError($TextError){
		$this->MySQLErrors[] = $TextError;
		die($TextError);
	}

	public function query($query, $FreeMemory = false, $write_last = true){
		
		$TimeA = $this->get_time();
		$xxt_res = mysqli_query($this->con, $query) or $this->GetError(mysqli_error($this->con));
		
		if($write_last) $this->LastQuery = $xxt_res;
		
		$TimeB = $this->get_time() - $TimeA;
		$this->TimeQuery += $TimeB;
		
			if($TimeB > $this->MaxExTime){$this->HardQuery = $query; $this->MaxExTime = $TimeB;}
			
				if( empty($this->ListQueryes) ) $this->ListQueryes = $query; else $this->ListQueryes .= "\n".$query;
			
		$this->Queryes++;
		
		if(!$FreeMemory){
			return $this->LastQuery;
		}else return $this->FreeMemory();
	
	}
	public function get($query){
    $q = mysqli_query($this->con, $query);
    $error = mysqli_error($this->con);
    echo "error:" . $error;
    return $q;	
	}

	private function get_time()
	{
		list($seconds, $microSeconds) = explode(' ', microtime());
		return ((float) $seconds + (float) $microSeconds);
	}
	function fetch(){
		$xres = mysqli_fetch_row($this->LastQuery);
		
		return (count($xres) > 1) ? $xres :  $xres[0];
	}
	function fetchArray(){
		//if($this->LastQuery)
		return mysqli_fetch_array($this->LastQuery);
	}
	function numrows()
	{
		return mysqli_num_rows($this->LastQuery);
	}
  function fcount(){
    return mysqli_num_fields($this->LastQuery);    
  }
  function fetchfield(){
    return mysqli_fetch_field($this->LastQuery);
  }
}

class db_config{
  public $local;
  public $remote;
  public $current;
  public function __construct(){
   $this->local = new db_setting("192.168.0.46","root","root","waswas"); 
   $this->remote = new db_setting("maxbuk.mysql.ukraine.com.ua","maxbuk_db","bukshovan2009","maxbuk_db"); 
 }
}
/*
$server = "maxbuk.mysql.ukraine.com.ua";
$dbname = "maxbuk_db";
$user = "maxbuk_db";
$password = "bukshovan2009";
*/
  $config = new db_config();
  $dbloc = "xlocal";
  if(isset($_GET["db"])){
    $dbloc = $_GET["db"];
  }
  $config->current = ($dbloc == "local" ? $config->local : $config->remote);
  $db = new db($config->current->server ,$config->current->user,$config->current->password,$config->current->dbname);

function connect() 
{

$server = "maxbuk.mysql.ukraine.com.ua";
$dbname = "maxbuk_db";
$user = "maxbuk_db";
$password = "bukshovan2009";


$conn = new mysqli($server, $user, $password, $dbname);

if ($conn->connect_error) {
    die("{result:false,data:'Connection failed: " . $conn->connect_error . "'}");
    return NULL;
} 


if (!$conn->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $conn->error);
} else {
    //printf("Current character set: %s\n", $conn->character_set_name());
}
return $conn;
}
function db_count($sql) {
		
	$conn = connect();
		
	if ($conn == NULL) {
		die("Connection failed: " . $conn->connect_error);
	}
    $result = $conn->query($sql);
    $count =$result->num_rows;
	
    $conn->close();
    return $count;
}
		

//-------------------------------------
//
function foreach_row($sql,$callback) {
		
		$conn = connect();
		
		if ($conn == NULL) {
			die("Connection failed: " . $conn->connect_error);
		}
		
  
//  header("Content-Type: application/json");
//  header("Cache-Control: no-cache");
	
		
  $result = $conn->query($sql);
//  $s = '';
  if ($result->num_rows > 0)
  {
	  $count = $result->field_count;
//	  $s .= "[";
	  $i = 0;
	  while($row = $result->fetch_assoc())
	  {
/*		  if($i >0)
		  {
			  $s .= ",";
		  }
		  $s .= "{";
		  
		  for($n =0 ; $n < $count;$n++) {
			  $finfo = $result->fetch_field_direct($n);
			  if($n > 0) $s .= ",";
			  $v = $row[$finfo->name];//str_replace( array( "\n", "\r" ), array( "\\n", "\\r" ), $row[$finfo->name] );
			  //$v  = addslashes($row[$finfo->name]);
			  //$s .= '"' . $finfo->name . '":"' . $row[$finfo->name] . '"' ;
			  $s .= '"' . $finfo->name . '":"' . $v . '"' ;
			  
		  }
		  
		  $s .= "}";*/
		  $callback($result,$row,$i);
		  $i = $i + 1;
	  }
//	  $s .= "]";
  }
  else
  {
//	  $s .= "[]";
  }
  $conn->close();
  //return $s;
}
//-------------------------------------
//
function db_execute($sql) {
		
	$conn = connect();
		
	if ($conn == NULL) {
		die("Connection failed: " . $conn->connect_error);
	}
	if ($conn->query($sql) === TRUE) {
		echo '{"result":true}';
	} else {
		echo '{"result":"' . $conn->error .'"}';
	}
    $conn->close();
  
}
	
//--------------------------------
//   get_json_str
//---------------------------------
function make_json($result,$row,$i)
{
	$s = "";
	if($i >0) {
	   $s .= ",";
	}
	$s .= "{";
	for($n =0 ; $n < $count;$n++) {
	   $finfo = $result->fetch_field_direct($n);
	   if($n > 0) $s .= ",";
	   $v = $row[$finfo->name];
	   $s .= '"' . $finfo->name . '":"' . $v . '"' ;
	}
	$s .= "}";
	return $s;
}
function get_json_str2($sql) {
		
  header("Content-Type: application/json");
  header("Cache-Control: no-cache");
  
		
  $s .= "[";
  $f = "make_json";
  foreach_row($sql, $f);
  $s .= "]";
	
  return $s;
}
	
function get_json_str($sql) {

$conn = connect();

if ($conn == NULL) {
    die("Connection failed: " . $conn->connect_error);
} 

  
  header("Content-Type: application/json");
  header("Cache-Control: no-cache");
  
    
  $result = $conn->query($sql);
  $s = '';
  if ($result->num_rows > 0) 
  {
      $count = $result->field_count;
      $s .= "[";
      $i = 0;
      while($row = $result->fetch_assoc()) 
      {
          if($i >0)
          {
            $s .= ",";
          }
          $s .= "{";

         for($n =0 ; $n < $count;$n++) {
              $finfo = $result->fetch_field_direct($n);
              if($n > 0) $s .= ",";
			 $v = $row[$finfo->name];//str_replace( array( "\n", "\r" ), array( "\\n", "\\r" ), $row[$finfo->name] );
			 $v =str_replace( array( "\""), array( "'"), $row[$finfo->name] );
			 //$v  = addslashes($row[$finfo->name]);
              //$s .= '"' . $finfo->name . '":"' . $row[$finfo->name] . '"' ;
			 $s .= '"' . $finfo->name . '":"' . $v . '"' ;

         }

          $s .= "}";
          $i = $i + 1;
      }
      $s .= "]";
  }
  else
  {
     $s .= "[]";
  }
  $conn->close();
  return $s;
}
//------------------------------------------------------
//   get_json
//-----------------------------------------------------
function get_json($sql) {

$conn = connect();

if ($conn == NULL) {
    die("Connection failed: " . $conn->connect_error);
} 

  
  header("Content-Type: application/json");
  header("Cache-Control: no-cache");
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header('Access-Control-Allow-Methods: GET, POST');

    
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) 
  {
      $count = $result->field_count;
      echo "[";
      $i = 0;
      while($row = $result->fetch_assoc()) 
      {
          if($i >0)
          {
            echo ",";
          }
          echo "{";

         for($n =0 ; $n < $count;$n++) {
              $finfo = $result->fetch_field_direct($n);
              if($n > 0) echo ",";
            //  echo '"' . $finfo->name . '":"' . $row[$finfo->name] . '"' ;
			 $v =addslashes($row[$finfo->name]);
			 $v = str_replace( array( "\n", "\r" ), array( "\\n", "\\r" ), $row[$finfo->name] );
			 echo '"' . $finfo->name . '":"' . $v . '"' ;
         }

          echo "}";
          $i = $i + 1;
      }
      echo "]";
  }
  else
  {
     echo "[]";
  }
  $conn->close();
}

function mb_load_file($file){
$maket = file_get_contents($file, true);
//$s = preg_replace("/[\r\n]+/", "", $maket);
return $maket;
}
//------------------------------------------------------
//   parse_maket
//-----------------------------------------------------
function parse_maket($maket){
  $s = preg_replace("/[\r\n]+/", "", $maket);
  $pieces = explode("<?loop", $s);
  $header = $pieces[0];
  $pieces = explode("loop?>", $pieces[1]);
  $body = $pieces[0];
  $footer = $pieces[1];
return array($header,$body,$footer);
}

//------------------------------------------------------
//   load_maket
//-----------------------------------------------------
function load_maket($file){
$maket = file_get_contents($file, true);
	return parse_maket($maket);
}
//------------------------------------------------------
//   read_maket
//-----------------------------------------------------
function read_maket($name){
	
	$maket = file_get_contents('./../html/makets.html', true);
	$s = preg_replace("/[\r\n]+/", "", $maket);
	
	$pieces = explode("<!--#" . $name . "-begin-->", $s);
	$pieces = explode("<!--#" . $name . "-end-->", $pieces[1]);
	$maket = $pieces[0];
	
 return parse_maket($maket);
}

?>