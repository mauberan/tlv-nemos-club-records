<?php
/**
 * Created by PhpStorm.
 * User: Ran
 * Date: 10/11/2018
 * Time: 10:59
 */
include('../nemos_functions.php');
?>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>



<body>
<form id="add_score_form" method="post" action="#">

  <table id="form_table" class="add-score-table input-group">





    <tr>
      <td>

        Nemo:          </td>
      <td> <!--Swimmer ID-->

        <select class="form-control form-input-name add-score-checkbox" name="swidInput" aria-describedby="Name" placeholder="Nemo Name">
          <?php

          form_select_list_swimmers();
          ?>

        </select>
      </td>
      <td>
        Event:          </td>
      <td> <!--Event ID-->
        <select class="form-control form-input-name add-score-checkbox" name="eidInput" aria-describedby="Event" placeholder="Event">
          <?php
          form_select_list_events();
          ?>
        </select>
      </td>
      <td> <!--Stroke-->
        <select class="form-control form-input-name add-score-checkbox" name="strokeInput" aria-describedby="Stroke" placeholder="Stroke">
          <option value="FS">Free</option>
          <option value="BRS">Breast</option>
          <option value="BS">Back</option>
          <option value="FLY">Fly</option>
          <option value="IM">IM</option>

        </select>
      </td>
      <td> <!--Distance-->
        <select class="form-control form-input-name add-score-checkbox" name="distanceInput" aria-describedby="Distance" placeholder="Distance">
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="400">400</option>
          <option value="800">800</option>
          <option value="1500">1500</option>

        </select>
      </td>


      <!--          changed code to auto calculate age group-->
      <!--            <td> <!--Age Group-->
      <!--              <select class="form-control" name="ageGroupInput" aria-describedby="Age Group" placeholder="Age Group">-->
      <!--                  <option value="30">25-30</option>-->
      <!--                  <option value="35">30-35</option>-->
      <!--                  <option value="40">35-40</option>-->
      <!--                  <option value="45">40-45</option>-->
      <!--                  <option value="50">45-50</option>-->
      <!--                  <option value="55">50-55</option>-->
      <!--                  <option value="60">55-60</option>-->
      <!--                  <option value="65">60-65</option>-->
      <!--              </select>-->
      <!--            </td> -->
      <td>
        Rank in age:
      </td>
      <td> <!--Age Group rank Points-->
        <input type="number" class="form-control " name="ageRankInput" min="1" max="99">
      </td>
      <td>
        FINA Points
      </td>
      <td> <!--FINA Points-->
        <input type="number" class="form-control " name="pointsInput" min="0" max="1000">
      </td>

    </tr>
    <tr>
      <td>TIME:</td>
      <td> <!--TIME-->
        <input type="time"  step="1" class="form-control time-input" name="time" min="0" max="99">

      </td>
      <td>
        <button type="submit"  id="submit_score" class="btn btn-primary">Add Score</button>
      </td>
      <td class="icon-size">
        <div ><i class="fas fa-stopwatch"></i></div></td>
      <td>
    </tr>
  </table>
</form>
<div id="messages">

</div>
</body>
<script src="../js/add_score_form.js"></script>

</html>
