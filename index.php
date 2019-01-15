<?php
/**
 * Created by PhpStorm.
 * User: Ran
 * Date: 06/07/2018
 * Time: 15:39
 */
//  <div class="logo">TLV NEMOS</div>

echo '
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-131325560-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag(\'js\', new Date());

  gtag(\'config\', \'UA-131325560-1\');
</script>


<html>

<body>

  <div class="dashboard">
<div id="first_line">
  <span id="main_buttons">
    <span id="speed" class="button"><i class="fas fa-trophy"></i> FASTEST </span>
      <span id="relays" class="button"><i class="fas fa-users"></i> Relays </span>
    <span id="swimmer" class="button"><i class="fas fa-swimmer"></i> Swimmer </span>
    <span id="event" class="button"><i class="far fa-calendar-alt"></i> Event </span>
      <span id="all" class="button"><i class="fas fa-stopwatch"></i> All Scores </span>
          <span id="about" class="button"><i class="fas fa-info"></i> About </span>

</span>
<span class="club_logo">
          <img src="css/tlvnemosnotext.png" id="logo" width="55px"height="35px" align="right"></img>
          </span>
          <div class="fish">
  <div class="tail"></div>
  <div class="fins">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="bottom"></div>
  </div>
  <div class="body"></div>
  <div class="side"></div>
  <div class="eye"></div>
  <div class="bubbles">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
  </div>
</div>
</div>
<div id="page_buttons" class="page-dashboard">
</div>

<link rel="stylesheet" type="text/css" href="css/theme.css" media="screen">
<link rel="stylesheet" type="text/css" href="css/fish.css" media="screen">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="js/main.js"></script>





  </div>
<div id="display">
<div id="header" class="header">
  <div id="title" class="header title"></div>
  <div id="subtitle" class="header subtitle"></div>
  <div id="stats" class="header stats"></div>
</div>

<div id="page">

</div>
</div>





</body>

  </html>
  ';
