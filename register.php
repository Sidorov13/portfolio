<?
error_reporting(E_ALL);
//session_start();
$uid = -1;
if (isset($_SESSION['uid'])) {
   $uid = $_SESSION['uid'];
  // echo "User <b>ID</b>:" . $uid;
}

require_once "./wwcnn.php";

if(isset($_GET["user"]) && isset($_GET["pwd"])){
  $email = $_GET["user"];
  $pwd = $_GET["pwd"];
  $action = $_GET["action"];

 

  if($action == "login"){  
  $db->query("SELECT * FROM ser13_users WHERE email = '$email' AND pwd='$pwd'");
  if($db->NumRows() == 0){ 
    echo "{\"result\":false,\"id\":-1}";
    exit;
  }
 
  $data = $db->FetchArray();
  $_SESSION['uid'] = $data["id"];
//  echo  "User :" .$email . " pwd:" . $data["pwd"] . " ID:<b>" . $data["id"]. "</b>";
  echo "{\"result\":true,\"id\":" . $data["id"]."}";
  exit;
  }

  if($action == "register"){  
  $db->query("SELECT * FROM ser13_users WHERE email = '$email'");
  if($db->NumRows()> 0){ 
    echo "{\"result\":false,\"id\":-1,\"msg\":\"exists\"}";
    exit;
  }
  if($db->query("insert into ser13_users (email,pwd) values('".$email."','".$pwd."')")=== TRUE){

  $db->query("SELECT * FROM ser13_users WHERE email = '$email' AND pwd='$pwd'");
  if($db->NumRows() == 0){ 
    echo "{\"result\":false,\"id\":-1}";
    exit;
  }
 
  $data = $db->FetchArray();
  $_SESSION['uid'] = $data["id"];
//  echo  "User :" .$email . " pwd:" . $data["pwd"] . " ID:<b>" . $data["id"]. "</b>";
  echo "{\"result\":true,\"id\":" . $data["id"].",\"msg\":\"ok\"}";
  exit;
  }

  echo "{\"result\":false,\"id\":-1,\"msg\":\"error insert\"}"; 
  exit;
  }


}
echo "{\"result\":false,\"id\":-1}";
?>