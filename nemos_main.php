<?php

require ('nemos_functions.php');
/**
 * Created by PhpStorm.
 * User: Ran
 * Date: 26/04/2018
 * Time: 5:00
 */

//stats

function get_swimmer_number_of_events($swid) {
  $sql = "SELECT COUNT(distinct eid) from scores where swid LIKE '" . $swid . "'";

  $conn = db_connection();


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

function get_swimmer_number_of_dives($swid) {
  $sql = "SELECT COUNT(distinct scid) from scores where swid LIKE '" . $swid . "'";

  $conn = db_connection();

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
function get_swimmer_number_of_gold_medals($swid) {
  $sql = "SELECT COUNT(distinct scid) from scores where swid LIKE '" . $swid . "' AND rank_in_ag LIKE 1";

  $conn = db_connection();


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

function get_swimmer_number_of_silver_medals($swid) {
  $sql = "SELECT COUNT(distinct scid) from scores where swid LIKE '" . $swid . "' AND rank_in_ag LIKE 2";

  $conn = db_connection();


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

function get_swimmer_number_of_bronze_medals($swid) {
  $sql = "SELECT COUNT(distinct scid) from scores where swid LIKE '" . $swid . "' AND rank_in_ag LIKE 3";

  $conn = db_connection();


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


function get_swimmer_number_of_relays_dives($swid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where (swid1 LIKE'" . $swid . "' OR swid2 LIKE '" . $swid . "' OR swid3 LIKE '" . $swid . "' OR swid4 LIKE '" . $swid . "')";

  $conn = db_connection();

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

function get_swimmer_number_of_relays_gold_medals($swid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 1 AND (swid1 LIKE'" . $swid . "' OR swid2 LIKE '" . $swid . "' OR swid3 LIKE '" . $swid . "' OR swid4 LIKE '" . $swid . "')";

  $conn = db_connection();

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

function get_swimmer_number_of_relays_silver_medals($swid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 2 AND (swid1 LIKE'" . $swid . "' OR swid2 LIKE '" . $swid . "' OR swid3 LIKE '" . $swid . "' OR swid4 LIKE '" . $swid . "')";

  $conn = db_connection();

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
function get_swimmer_number_of_relays_bronze_medals($swid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 3 AND (swid1 LIKE'" . $swid . "' OR swid2 LIKE '" . $swid . "' OR swid3 LIKE '" . $swid . "' OR swid4 LIKE '" . $swid . "')";

  $conn = db_connection();

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

function get_swimmer_fina_points($swid) {
  $sql = "SELECT SUM(points) from scores where swid LIKE '" . $swid . "'";

  $conn = db_connection();

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

function get_swimmer_club_records($swid) {

}

function get_swimmer_current_age_group($swid) {
  $sql = "SELECT byear from swimmers where swid LIKE '" . $swid . "'";

  $conn = db_connection();

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }
  $conn->close();


  if ($ret) {
    $age = date("Y") - $ret[0]['byear'];
    if ($age < 30) {
      return 21;
    }
    return ($age - ($age % 5));
  }


  return $ret;

}

function get_swimmer_stats($swid) {
  $ret = [];

  $ret['num_of_events'] = ["Events participated" , reset(get_swimmer_number_of_events($swid)[0])];
  $ret['num_of_dives'] = ["Dives",reset(get_swimmer_number_of_dives($swid)[0])];
  $ret['num_of_gold'] = ["Personal Gold",reset(get_swimmer_number_of_gold_medals($swid)[0])];
  $ret['num_of_silver'] = ["Personal Silver",reset(get_swimmer_number_of_silver_medals($swid)[0])];
  $ret['num_of_bronze'] = ["Personal Bronze" ,reset(get_swimmer_number_of_bronze_medals($swid)[0])];
  $ret['num_of_relay_dives'] = ["Relay Dives" ,reset(get_swimmer_number_of_relays_dives($swid)[0])];
  $ret['num_of_relay_gold'] = ["Relays Gold" ,reset(get_swimmer_number_of_relays_gold_medals($swid)[0])];
  $ret['num_of_relay_silver'] = ["Relays Silver" ,reset(get_swimmer_number_of_relays_silver_medals($swid)[0])];
  $ret['num_of_relay_bronze'] = ["Relays Bronze" ,reset(get_swimmer_number_of_relays_bronze_medals($swid)[0])];
  $ret['sum_fina_points'] = ["Total fina points" ,reset(get_swimmer_fina_points($swid)[0])];
  $ret['current_age_group'] = get_swimmer_current_age_group($swid);
  return $ret;


}

//----------------------------------------------------------------------------

function get_event_number_of_participants($eid) {
  $sql = "SELECT COUNT(distinct swid) from scores where eid LIKE '" . $eid . "'";

  $conn = db_connection();

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

function get_event_number_of_dives($eid) {
  $sql = "SELECT COUNT(distinct scid) from scores where eid LIKE '" . $eid . "'";

  $conn = db_connection();

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

function get_event_number_of_gold_medals($eid) {
  $sql = "SELECT COUNT(distinct scid) from scores where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 1";

  $conn = db_connection();


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

function get_event_number_of_silver_medals($eid) {
  $sql = "SELECT COUNT(distinct scid) from scores where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 2";

  $conn = db_connection();


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

function get_event_number_of_bronze_medals($eid) {
  $sql = "SELECT COUNT(distinct scid) from scores where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 3";

  $conn = db_connection();


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

function get_event_number_relays_dives($eid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where eid LIKE '" . $eid . "'";

  $conn = db_connection();

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

function get_event_number_of_relays_gold_medals($eid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 1";

  $conn = db_connection();

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
function get_event_number_of_relays_silver_medals($eid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 2";

  $conn = db_connection();

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
function get_event_number_of_relays_bronze_medals($eid) {
  $sql = "SELECT COUNT(distinct rscid) from relays where eid LIKE '" . $eid . "' AND rank_in_ag LIKE 3";

  $conn = db_connection();

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

function get_event_info($eid) {
  $sql = "SELECT * from events where eid LIKE '" . $eid . "'";

  $conn = db_connection();


  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  } else {
  }
  $conn->close();
  return $ret;}

function get_event_stats($eid) {
  $ret  = [];
  $ret['num_of_participants'] = ["Swimmers participated", reset(get_event_number_of_participants($eid)[0])];
  $ret['num_of_dives'] = ["Dives",reset(get_event_number_of_dives($eid)[0])];
  $ret['num_of_gold'] = ["Personal Gold", reset(get_event_number_of_gold_medals($eid)[0])];
  $ret['num_of_silver'] = ["Personal Silver",reset(get_event_number_of_silver_medals($eid)[0])];
  $ret['num_of_bronze'] = ["Personal Bronze",reset(get_event_number_of_bronze_medals($eid)[0])];
  $ret['num_of_relay_dives'] = ["Relays Dives",reset(get_event_number_relays_dives($eid)[0])];
  $ret['num_of_relay_gold'] = ["Relays Gold",reset(get_event_number_of_relays_gold_medals($eid)[0])];
  $ret['num_of_relay_silver'] = ["Relays Silver",reset(get_event_number_of_relays_silver_medals($eid)[0])];
  $ret['num_of_relay_bronze'] = ["Relays Bronze",reset(get_event_number_of_relays_bronze_medals($eid)[0])];
  $ret['event_info'] = get_event_info($eid);
  return $ret;
}

//------------------------------------------------------------------------------


function get_club_number_of_participants() {
  $sql = "SELECT COUNT(distinct swid) from swimmers";

  $conn = db_connection();


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

function get_club_number_of_dives() {
  $sql = "SELECT COUNT(distinct scid) from scores";

  $conn = db_connection();


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

function get_club_number_of_events() {
  $sql = "SELECT COUNT(distinct eid) from events";

  $conn = db_connection();


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


function get_club_number_of_gold_medals() {
  $sql = "SELECT COUNT(distinct scid) from scores where rank_in_ag LIKE 1";

  $conn = db_connection();


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

function get_club_number_of_silver_medals() {
  $sql = "SELECT COUNT(distinct scid) from scores where rank_in_ag LIKE 2";

  $conn = db_connection();


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

function get_club_number_of_bronze_medals() {
  $sql = "SELECT COUNT(distinct scid) from scores where rank_in_ag LIKE 3";

  $conn = db_connection();


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

function get_club_number_relays_dives() {
  $sql = "SELECT COUNT(distinct rscid) from relays";

  $conn = db_connection();


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

function get_club_number_of_relays_gold_medals() {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 1";

  $conn = db_connection();

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
function get_club_number_of_relays_silver_medals() {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 2";

  $conn = db_connection();

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
function get_club_number_of_relays_bronze_medals() {
  $sql = "SELECT COUNT(distinct rscid) from relays where rank_in_ag LIKE 3";

  $conn = db_connection();

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


function get_club_stats() {
  $ret  = [];
  $ret['num_of_participants'] = reset(get_club_number_of_participants()[0]);
  $ret['num_of_events'] = reset(get_club_number_of_events()[0]);

  $ret['num_of_dives'] = reset(get_club_number_of_dives()[0]);
  $ret['num_of_gold'] = reset(get_club_number_of_gold_medals()[0]);
  $ret['num_of_silver'] = reset(get_club_number_of_silver_medals()[0]);
  $ret['num_of_bronze'] = reset(get_club_number_of_bronze_medals()[0]);

  $ret['num_of_relay_dives'] = reset(get_club_number_relays_dives()[0]);
  $ret['num_of_relay_gold'] = reset(get_club_number_of_relays_gold_medals()[0]);
  $ret['num_of_relay_silver'] = reset(get_club_number_of_relays_silver_medals()[0]);
  $ret['num_of_relay_bronze'] = reset(get_club_number_of_relays_bronze_medals()[0]);
  return $ret;
}



//------------------------------------------------------------------------------

function site_managment_query($type) {
  $query = null;
  $conn = db_connection();


  switch($type) {
    case 'swimmers':
      $query = "Select * from swimmers";
      break;

    case 'events':
      $query = "Select * from events";
      break;
    case 'relays':
      $query = "Select * from relays";

      break;
    case 'scores':
      $query = "Select * from scores";

      break;
  }
  if ($query != null) {
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      $ret = [];
      while ($row = $result->fetch_assoc()) {
        array_push($ret, $row);
      }
    }
    $conn->close();
    return $ret;
  }

}

function get_fastest_of_stroke($stroke) {
  $conn = db_connection();

  $sql = "Select firstname,lastname,stroke,time,events.name,events.date,events.location,rank_in_ag,points FROM scores 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.stroke LIKE '" . $stroke ."' ORDER by time";

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

function get_fastest_of_stroke_of_age_group($stroke,$ag,$gender) {
  $conn = db_connection();

  $sql = "Select scid,firstname,lastname,stroke,time,events.name,events.date,events.location,rank_in_ag,points FROM scores 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.stroke LIKE '" . $stroke ."' AND swimmers.gender LIKE '" . $gender . "' ORDER by time";

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

function get_scores_of_swimmer($swid) {
  $conn = db_connection();

  $sql = 'Select scid,firstname,lastname,distance,stroke,time,events.name,events.date,events.location,rank_in_ag,points FROM scores 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.swid = ' . $swid .";";

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

function filter_results_by_gender($results, $gender) {
  //might not be the way to solve this
}

function get_swimmers_names() {
  $conn = db_connection();

  $sql = "Select CONCAT(firstname, ' ' ,lastname) as name, swid From swimmers";

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

function get_event_names() {
  $conn = db_connection();

  $sql = "Select events.eid,events.name From events";

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

function stroke_converter($stroke) {
  $ret = "";
  switch ($stroke) {
    case 'Free':
    case 'FREE':
    case 'FS':
    case 'Freestyle':
      $ret = 'FS';
      break;
    case 'Breast':
    case 'BRS':
    case 'BREAST':
    case 'Breaststroke':
      $ret = 'BRS';
      break;
    case 'Breast':
    case 'BRS':
    case 'BREAST':
    case 'Breaststroke':
      $ret = 'BRS';
      break;
    case 'Back':
    case 'Backstroke':
    case 'BS':
    case 'BACKSTROKE':
      $ret = 'BS';
      break;
    case 'Fly':
    case 'FLY':
    case 'Butterfly':
      $ret = 'FLY';
      break;
    case 'IM':
      $ret = 'IM';
  }
  return $ret;
}

//query functions

function get_speed_query($stroke,$distance,$age_group,$gender,$course) {
  $conn = db_connection();
  $stroke = stroke_converter($stroke);


  if ($age_group == 0) { //all age groups

    //scid,swid,eid,swimmerFirstName,swimmerLastName,swimmerGender,swimmerByear,
    //stroke,distance,time,points,rankInAgeGroup,eventName,location,course,date

    $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits FROM scores 
 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.stroke LIKE '" . $stroke ."'AND events.course LIKE '" . $course . "'AND scores.distance LIKE '" . $distance . "' AND swimmers.gender LIKE '" . $gender . "'ORDER by time limit 3";
  }
  else { //specific age group
    $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits FROM scores 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.stroke LIKE '" . $stroke ."'AND events.course LIKE '" . $course . "'AND scores.distance LIKE '" . $distance . "' AND swimmers.gender LIKE '" . $gender . "'AND scores.age_group LIKE " . $age_group . " ORDER by time limit 3";

  }

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $ret = [];
    while ($row = $result->fetch_assoc()) {
      array_push($ret, $row);
    }
  }
  $conn->close();
  return $ret;
}

function get_swimmer_query($swimmer,$criteria) {


  switch($criteria) {
    case 'Event':
      $crit = 'eid,distance,stroke,time';
      break;
    case 'Course':
      $crit = 'course DESC,distance,stroke,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,course,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;


  }
  $conn = db_connection();
  $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits FROM scores 
 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE swimmers.swid LIKE " . $swimmer . " ORDER BY " . $crit ;
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

function get_relays_query($stroke,$distance, $course, $ageGroup, $gender) {
  $new_stroke = stroke_converter($stroke);

  if ($ageGroup === 'Club Record') {
    $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits FROM relays 

          LEFT JOIN events ON relays.eid = events.eid
          WHERE relays.stroke LIKE '" . $new_stroke . "' AND relays.distance LIKE '" . $distance . "'AND events.course LIKE '" . $course . "' AND relays.gender LIKE '" . $gender . "'ORDER by time limit 3";

  } else if ($ageGroup === 'All') {
    $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits FROM relays 

          LEFT JOIN events ON relays.eid = events.eid
          WHERE relays.stroke LIKE '" . $new_stroke . "' AND relays.distance LIKE '" . $distance . "'AND events.course LIKE '" . $course . "' AND relays.gender LIKE '" . $gender . "'ORDER by date";

  } else {
    $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits from relays 

          LEFT JOIN events ON relays.eid = events.eid
          WHERE relays.stroke LIKE '" . $new_stroke . "' AND relays.age_group LIKE '" . $ageGroup. "' AND relays.distance LIKE '" . $distance . "'AND events.course LIKE '" . $course . "' AND relays.gender LIKE '" . $gender . "'";
  }

  $conn = db_connection();


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

function get_all_results_query($criteria) {
  switch($criteria) {
    case 'Course':
      $crit = 'course,stroke,distance,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,time';
      break;
    case 'Age Group':
      $crit = 'age_group,stroke,distance,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;

  }
  $conn = db_connection();
  $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits from scores 
 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid ORDER BY " . $crit;
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

function get_event_query($eventId, $criteria) {
  switch($criteria) {
    case 'Swimmer':
      $crit = 'swid,distance,stroke,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,time';
      break;
    case 'Age Group':
      $crit = 'age_group,stroke,distance,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;

  }

  $conn = db_connection();
  $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits FROM scores 
 
          LEFT JOIN swimmers ON scores.swid = swimmers.swid 
          LEFT JOIN events ON scores.eid = events.eid
          WHERE events.eid LIKE " . $eventId . " ORDER BY " . $crit;
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

function get_swimmer_query_by_stroke($swimmer,$criteria) {
  $ret = [];
  $distnaces = get_all_distances();
  $strokes = get_all_strokes_names();

  switch($criteria) {
    case 'Event':
      $crit = 'eid,distance,stroke,time';
      break;
    case 'Course':
      $crit = 'course DESC,distance,stroke,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,course,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;


  }

  foreach ($strokes as $current_stroke) {
    foreach ($distnaces as $current_distance) {
     if (is_valid_distance($current_stroke,$current_distance)) {
       $stroke_converted = stroke_converter($current_stroke);
       $conn = db_connection();
       $sql = "Select scid,swimmers.swid,events.eid,firstname,lastname,swimmers.gender,swimmers.byear,scores.stroke,scores.distance,scores.time,scores.points,age_group,scores.rank_in_ag,events.name,events.location,events.course,events.date,splits FROM scores

          LEFT JOIN swimmers ON scores.swid = swimmers.swid
          LEFT JOIN events ON scores.eid = events.eid
          WHERE scores.stroke LIKE '" . $stroke_converted . "' AND scores.distance = " . $current_distance . " AND swimmers.swid LIKE " . $swimmer . " ORDER BY " . $crit ;
       $result = $conn->query($sql);
       $stroke_result = [];


       if ($result->num_rows > 0) {

         while ($row = $result->fetch_assoc()) {
           array_push($stroke_result, $row);
         }
       } else {
       }
       $conn->close();
       array_push($ret,$current_distance,$current_stroke,$stroke_result);
     }

//             array_push($ret,is_valid_distance($current_stroke,$current_distance));

    }
  }



  return $ret;
}


//relays query for states

function get_swimmer_relays_query($swid, $criteria) {
  switch($criteria) {
    case 'Event':
      $crit = 'eid,stroke,distance,time';
      break;
    case 'Course':
      $crit = 'course,stroke,distance,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,course,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;



  }
  $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits FROM relays 
          LEFT JOIN events ON relays.eid = events.eid
          WHERE swid1 LIKE '" . $swid . "' OR swid2 LIKE '" . $swid . "' OR swid3 LIKE '" . $swid . "' OR swid4 LIKE '" . $swid . "' ORDER BY " . $crit;

  $conn = db_connection();


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

function get_event_relays_query($eid, $criteria) {
  switch($criteria) {
    case 'Swimmer':
      $crit = 'distance,stroke,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,time';
      break;
    case 'Age Group':
      $crit = 'age_group,stroke,distance,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;

  }

  $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits FROM relays 
          LEFT JOIN events ON relays.eid = events.eid
          WHERE relays.eid LIKE '" . $eid . "' ORDER BY " . $crit;
  $conn = db_connection();


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

function get_all_relays_results_query( $criteria) {
  switch($criteria) {
    case 'Course':
      $crit = 'course,stroke,distance,time';
      break;
    case 'Stroke':
      $crit = 'stroke,distance,time';
      break;
    case 'Age Group':
      $crit = 'age_group,stroke,distance,time';
      break;
    case 'Rank':
      $crit = 'rank_in_ag,stroke,distance,time';
      break;

  }
  $sql = "Select rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits FROM relays 
          LEFT JOIN events ON relays.eid = events.eid ORDER BY " . $crit;

  $conn = db_connection();


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

//database management

function add_event($input) {
  $array = json_decode($input, true);
  $sql = "INSERT INTO events (name,date,location,course)
                 VALUES('".$array[0]['value']."','".$array[1]['value']."','".$array[2]['value']."','".$array[3]['value']."')";
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "New Event created successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
  return $ret;
}

function add_swimmer($input) {
  $array = json_decode($input, true);

  for ($i=0; $i<7; $i++) {
    if (!$array[$i]['value']) {
      $array[$i]['value'] = null;
    }
  }
  $sql = "INSERT INTO swimmers (firstname,lastname,email,bday,bmonth,byear,phone,gender)
                 VALUES('".$array[0]['value']."','".$array[1]['value']."',NULL,'".(int)$array[3]['value']."','".(int)$array[4]['value']."','".$array[5]['value']."',NULL,'".$array[2]['value']."')";

  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "New Swimmer created successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
  return $ret;}

function add_score($input) {
  $array = json_decode($input, true);
  $ageGroup = calculateAgeGroup($array[0]['value'],$array[1]['value']);
  foreach ($array as &$field) {
    if ($field['value'] == '') {
      $field['value'] = 0;
    }

  }

  $sql = "INSERT INTO scores (swid,eid,stroke,distance,time,age_group,rank_in_ag,points,splits)
                 VALUES('".$array[0]['value']."','".$array[1]['value']."','".$array[2]['value']."','" .$array[3]['value'] ."','".$array[6]['value']."','".$ageGroup."','".$array[4]['value']."','".$array[5]['value']."','".$array[8]['value']."')";
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "New record created successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;


}

function add_relays_score($input) {
  $array = json_decode($input, true);
  foreach ($array as &$field) {
    if ($field['value'] == '') {
      $field['value'] = 0;
    }

  }

  $sql = "INSERT INTO relays (eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag,points,gender,splits)
                 VALUES('".$array[0]['value']."','".$array[1]['value']."','".$array[2]['value']."','" .$array[4]['value'] ."','".$array[5]['value']."','".$array[6]['value']."','".$array[7]['value']."','".$array[11]['value']."','". $array[8]['value']."','".$array[9]['value']."','".$array[10]['value']."','".$array[3]['value']."','".$array[13]['value']."')";
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "New record created successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;


}

function delete_score($scid) {
  $sql = "DELETE From scores WHERE scid =" . $scid;
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "Record Deleted successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;

}

function delete_swimmer($swid) {
  $sql = "DELETE From swimmers WHERE swid = " . $swid;
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "Record Deleted successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;

}

function delete_relays($rscid) {
  $sql = "DELETE From relays WHERE rscid = " . $rscid;
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "Record Deleted successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;

}

function delete_event($eid) {
  $sql = 'DELETE from events WHERE eid = ' . $eid;
  $conn = db_connection();
  if ($conn->query($sql) === TRUE) {
    $ret =  "Record Deleted successfully";
  } else {
    $ret =  "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();

  return $ret;

}


function parse_result_splits_to_fragments($splits) {
  $parsed_splits = json_decode($splits, true);

  $distances = [];
  $ms_arr = [];
  $ms_cuts_50 = [];

  for ($i = 0; $i < sizeof($parsed_splits); $i++) {
    $ms_arr[$i] = string_to_ms($parsed_splits[$i]);
    $distances[$i] = ($i + 1) * 50;
  }
  if ($ms_arr[0]){
    $ms_cuts_50[0] = ms_to_string($ms_arr[0]);
  }
  for ($i = 1; $i < sizeof($ms_arr); $i++) {
    $ms_cuts_50[$i] = ms_to_string($ms_arr[$i] - $ms_arr[$i-1]);

  }


  return [$distances,$parsed_splits,$ms_cuts_50];

//return ms_to_string(100200);



}

function string_to_ms($time_string) {
  $hours_string = strtok($time_string,':');
  $minuts_string = substr($time_string, strpos($time_string, ":") + 1);
  $seconds_string = substr($minuts_string, strpos($minuts_string, ":") + 1);
  $minuts_string = strtok($minuts_string,':');
  $miliseconds_string = substr($seconds_string, strpos($seconds_string, ".") + 1);
  $seconds_string = strtok($seconds_string,'.');

  $hours_string = (int) preg_replace('/[^0-9]/', '', $hours_string);
  $minuts_string = (int) preg_replace('/[^0-9]/', '', $minuts_string);
  $seconds_string = (int) preg_replace('/[^0-9]/', '', $seconds_string);
  $miliseconds_string = (int) preg_replace('/[^0-9]/', '', $miliseconds_string);

  $ret = ($hours_string * 3600000) + ($minuts_string * 60000) + ($seconds_string * 1000) + ($miliseconds_string);

  return $ret;

}

function ms_to_string($time_ms) {
  $miliseconds = $time_ms % 1000;
  $seconds = $time_ms / 1000;

  $hours = floor($seconds / 3600);
  $seconds = $seconds % 3600;

  $minutes = floor($seconds / 60);
  $seconds = $seconds % 60;

  return sprintf('%02d',$hours) . ":" . sprintf('%02d',$minutes) . ":" . sprintf('%02d',$seconds) . "." .$miliseconds;
}

//
//  $reduced = (strtotime($parsed_splits[1])-strtotime($parsed_splits[0]));
//  return [gmdate("H:i:s.u", strtotime($parsed_splits[1])),gmdate("H:i:s.u", strtotime($parsed_splits[0])), gmdate("H:i:s.u", $reduced)];
//





header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

//if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

//if( !isset($aResult['error']) ) {

switch($_POST['functionname']) {
  case 'get_swimmer_query_by_stroke':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_swimmer_query_by_stroke($_POST['arguments'][0],$_POST['arguments'][1]);
    }
    break;

  case 'parse_result_splits_to_fragments':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = parse_result_splits_to_fragments($_POST['arguments'][0]);
    }
    break;

  case 'get_swimmer_relays_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_swimmer_relays_query($_POST['arguments'][0],$_POST['arguments'][1]);
    }
    break;
  case 'get_event_relays_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_event_relays_query($_POST['arguments'][0],$_POST['arguments'][1]);
    }
    break;
  case 'get_all_relays_results_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_all_relays_results_query($_POST['arguments'][0]);
    }
    break;



  case 'get_club_stats':

    $aResult['result'] = get_club_stats();

    break;



  case 'get_event_stats':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_event_stats($_POST['arguments'][0]);
    }
    break;


  case 'get_swimmer_stats':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = get_swimmer_stats($_POST['arguments'][0]);
    }
    break;


  case 'get_relays_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 5) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {   //arguments: stroke,distance,ageGroup,gender,course
      $aResult['result'] = get_relays_query($_POST['arguments'][0],$_POST['arguments'][1],$_POST['arguments'][2],$_POST['arguments'][3],$_POST['arguments'][4]);
    }
    break;

  case 'delete_event':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = delete_event($_POST['arguments'][0]);
    }
    break;
  case 'delete_swimmer':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = delete_swimmer($_POST['arguments'][0]);
    }
    break;
  case 'delete_score':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = delete_score($_POST['arguments'][0]);
    }
    break;
  case 'delete_relays':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = delete_relays($_POST['arguments'][0]);
    }
    break;



  case 'site_managment_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = site_managment_query($_POST['arguments'][0]);
    }
    break;

  case 'add_relays_score':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = add_relays_score($_POST['arguments'][0]);
    }
    break;

  case 'add_swimmer':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = add_swimmer($_POST['arguments'][0]);
    }
    break;
  case 'add_event':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = add_event($_POST['arguments'][0]);
    }
    break;
  case 'add_score':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {
      $aResult['result'] = add_score($_POST['arguments'][0]);
    }
    break;
  case 'get_speed_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 5) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {   //arguments: stroke,distance,ageGroup,gender,course
      $aResult['result'] = get_speed_query($_POST['arguments'][0],$_POST['arguments'][1],$_POST['arguments'][2],$_POST['arguments'][3],$_POST['arguments'][4]);
    }
    break;

  case 'get_swimmer_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {   //arguments: stroke,distance,ageGroup,gender,course
      $aResult['result'] = get_swimmer_query($_POST['arguments'][0],$_POST['arguments'][1]);
    }
    break;

  case 'get_all_results_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 1) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {   //arguments: stroke,distance,ageGroup,gender,course
      $aResult['result'] = get_all_results_query($_POST['arguments'][0]);
    }
    break;

  case 'get_event_query':
    if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
      $aResult['error'] = 'Error in arguments!';
    }
    else {   //arguments: stroke,distance,ageGroup,gender,course
      $aResult['result'] = get_event_query($_POST['arguments'][0],$_POST['arguments'][1]);
    }
    break;




  case 'get_all_swimmers':
    $aResult['result'] = get_all_swimmers();
    break;
  case 'get_all_events':
    $aResult['result'] = get_all_events();
    break;
  case 'get_all_scores':
    $aResult['result'] = get_all_scores();
    break;
  case 'get_all_strokes':
    $aResult['result'] = get_all_strokes();
    break;

  case 'get_all_age_groups':
    $aResult['result'] = get_all_age_groups();
    break;

  case 'get_all_genders':
    $aResult['result'] = get_all_strokes();
    break;

  case 'get_event_names':
    $aResult['result'] = get_event_names();
    break;

  case 'get_swimmers_names':
    $aResult['result'] = get_swimmers_names();
    break;
  default:
    $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
    break;


}

echo json_encode($aResult);

//TODO: calculate age_group field in score while creating the score

//TODO: move all querys function into one query function and SQL consts