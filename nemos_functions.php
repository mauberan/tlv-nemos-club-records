<?php
/**
 * Created by PhpStorm.
 * User: Ran
 * Date: 10/11/2018
 * Time: 13:42
 */

define('50 FS', '50 Freestyle');
define('100 FS', '100 Freestyle');
define('200 FS', '200 Freestyle');
define('400 FS', '400 Freestyle');
define('800 FS', '800 Freestyle');
define('1500 FS', '1500 Freestyle');

define('50 BRS', '50 Breaststroke');
define('100 BRS', '100 Breaststroke');
define('200 BRS', '200 Breaststroke');

define('50 BS', '50 Backstroke');
define('100 BS', '100 Backstroke');
define('200 BS', '200 Backstroke');

define('50 FLY', '50 Butterfly');
define('100 FLY', '100 Butterfly');
define('200 FLY', '200 Butterfly');

define('100 IM', '100 Individual Medley');
define('200 IM', '200 Individual Medley');
define('400 IM', '400 Individual Medley');

function get_all_strokes() {
  $strokes = array (
    '50 FS',
    '100 FS',
    '200 FS',
    '400 FS',
    '800 FS',
    '1500 FS',

    '50 BRS',
    '100 BRS',
    '200 BRS',

    '50 BS',
    '100 BS',
    '200 BS',

    '50 FLY',
    '100 FLY',
    '200 FLY',

    '100 IM',
    '200 IM',
    '400 IM',
  );
  return $strokes;
}

function get_all_strokes_names() {
  $ret = array (
'FS','BRS','BS','FLY','IM');
  return $ret;
}

function get_all_distances() {
  $ret = array (
    50,100,200,400,800,1500
  );
  return $ret;
}

function get_all_relay_strokes() {

}

function get_all_age_groups() {
  $ret = array (
    21,30,35,40,45,50,55,60,65
  );
  return $ret;
}

function get_all_swimmers() {

  $conn = db_connection();

  $sql = "Select * FROM swimmers";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }

  $conn->close();
  return $ret;
}

function get_all_events() {

  $conn = db_connection();

  $sql = "Select * FROM events";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }

  $conn->close();
  return $ret;
}

function get_all_scores() {
  $conn = db_connection();

  $sql = "Select scid,firstname,lastname,distance,stroke,time,events.name,events.date,events.location,rank_in_ag,points FROM scores 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid;";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }

  $conn->close();
  return $ret;
}

function form_select_list_swimmers() {
  $swimmers = get_all_swimmers();
  $output = '';
  foreach ($swimmers as $nemo) {
    $output .= '<option value="' . $nemo['swid']. '">' . $nemo['firstname'] . ' ' . $nemo['lastname'] . '</option>';
  }
  echo $output;
}

function search_select_list_swimmers() {
  $swimmers = get_all_swimmers();
  $output = '';
  foreach ($swimmers as $nemo) {
    $output .= '<option value="' . $nemo['swid']. '"></option>';
  }
  echo $output;
}

function form_select_list_events() {
  $events = get_all_events();

  $output = '';
  foreach ($events as $event) {
    $output .= '<option value="' . $event['eid']. '">' . $event['name'] . ' ' . $event['year'] .'</option>';
  }
  echo $output;
}

function get_all_genders() {
  return array('M', 'F');
}

function form_select_gender (){
  $genders = get_all_genders();
  foreach ($genders as $gender) {
    $output = '<option value="' . $gender . '">' . $gender . '</option>';
  }
  return $output;
}

function db_connection() {

  $servername = "Looking";
  $username = "For a job";
  $password = "as a";
  $dbname = "Front end developer";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  try {
    // Check connection
    if ($conn->connect_error) {
      throw new Exception("Failed to connect to MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error);
    }
  }
  catch (Exception $e) {
    echo 'Exception: ',  $e->getMessage(), "\n";
  }


  return $conn;
}

function calculateAgeGroup($swid,$eid)
{
  $conn = db_connection();

  $sql = "SELECT byear FROM swimmers WHERE swimmers.swid = " . $swid . " ";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }
  $swimmer = $ret[0]['byear'];

  $sql = "SELECT year(date) FROM events WHERE eid = " . $eid . " ";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }
  $event = $ret[0]['year(date)'];
    $conn->close();
    $age = ($event - $swimmer);
    if ($age < 30) {
      return 21;
    }
    return ($age - ($age % 5));
}

function is_valid_distance($stroke,$distance) {
     $legal_strokes = [
      '50 FS',
      '100 FS',
      '200 FS',
      '400 FS',
      '800 FS',
      '1500 FS',

      '50 BRS',
      '100 BRS',
      '200 BRS',

      '50 BS',
      '100 BS',
      '200 BS',

      '50 FLY',
      '100 FLY',
      '200 FLY',
      '100 IM',
      '200 IM',
      '400 IM',
    ];

    $input = strval($distance) . " " . stroke_converter($stroke);
    if (in_array($input,$legal_strokes)) {
      return true;
    }else {
      return false;
    }
}