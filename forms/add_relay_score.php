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

<script src="../js/add_relays_score_form.js"></script>


<body>
<form id="add_relays_score_form" method="post" action="#">

  <table id="form_table" class="add-score-table input-group">


  <tr>
    <td>
        Event
    </td>
    <td> <!--Event ID-->
      <select class="form-control form-input-name add-score-checkbox" name="eidInput" aria-describedby="Event" placeholder="Event">
        <?php
        form_select_list_events();
        ?>
      </select>
    </td>

    <td>
      Stroke
    </td>
    <td> <!--Relays Strokes-->
      <select class="form-control form-input-name add-score-checkbox" name="strokeInput" aria-describedby="Stroke" placeholder="Stroke">
        <option value="FS">Free</option>
        <option value="IM">IM</option>

      </select>
    </td>
    <td>
      Distance
    </td>
    <td> <!--Distance-->
      <select class="form-control form-input-name add-score-checkbox" name="distanceInput" aria-describedby="Distance" placeholder="Distance">
        <option value="4 X 50">4 X 50</option>
        <option value="4 X 100">4 X 100</option>
        <option value="4 X 200">4 X 200</option>
      </select>
    </td>
    <td>
      Gender:
    </td>
    <td>
      <select class="form-control form-input-name add-score-checkbox" name="genderInput" aria-describedby="Gender" placeholder="Gender">
        <option value="M">M</option>
        <option value="F">F</option>
        <option value="MIX">MIX</option>
      </select>
    </td>

  </tr>


    <tr>
      <td>

        Nemo 1:          </td>
      <td> <!--Swimmer ID-->

        <select class="form-control form-input-name add-score-checkbox" name="swid1Input" aria-describedby="Name" placeholder="Nemo Name">
          <?php

          form_select_list_swimmers();
          ?>

        </select>
      </td>
      <td>

        Nemo 2:          </td>
      <td> <!--Swimmer ID-->

        <select class="form-control form-input-name add-score-checkbox" name="swid2Input" aria-describedby="Name" placeholder="Nemo Name">
          <?php

          form_select_list_swimmers();
          ?>

        </select>
      </td>
      <td>

        Nemo 3:          </td>
      <td> <!--Swimmer ID-->

        <select class="form-control form-input-name add-score-checkbox" name="swid3Input" aria-describedby="Name" placeholder="Nemo Name">
          <?php

          form_select_list_swimmers();
          ?>

        </select>
      </td>
      <td>

        Nemo 4:          </td>
      <td> <!--Swimmer ID-->

        <select class="form-control form-input-name add-score-checkbox" name="swid4Input" aria-describedby="Name" placeholder="Nemo Name">
          <?php

          form_select_list_swimmers();
          ?>

        </select>
      </td>
  </tr>
    <tr>
<td>
  Relays Age Group
</td>



                  <td>
                    <select class="form-control" name="ageGroupInput" aria-describedby="Age Group" placeholder="Age Group">
                        <option value="100-119">100-119</option>
                        <option value="120–159">120–159</option>
                        <option value="160–199">160–199</option>
                        <option value="200–239">200–239</option>
                        <option value="240–279">240–279</option>
                        <option value="280–319">280–319</option>
                        <option value="320–359">320–359</option>
                    </select>
                  </td>


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
      <td>TOTAL TIME:</td>
      <td> <!--TIME-->
        <input type="time"  step="1" class="form-control time-input" name="time" min="0" max="99">
      </td>
      <td>
        <button type="submit"  id="submit_score" class="btn btn-primary">Add Relays Score</button>
      </td>

    </tr>
    <tr>
      <td>-----------------</td>
    </tr>
  </table>
</form>

<div id="messages">

</div>
</body>

</html>
