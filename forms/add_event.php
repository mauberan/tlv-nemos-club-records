<?php
/**
 * Created by PhpStorm.
 * User: Ran
 * Date: 10/11/2018
 * Time: 10:59
 **/
include('../nemos_functions.php');
?>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>



<body>
<form id="add_event_form" method="post" action="#">
  <table id="form_table" class="add-event-table input-group">
    <tr>
      <td>
        Event Name:
      </td>
      <td>

        <input type="text" class="form-control form-input-name" name="eventNameInput" aria-describedby="Name" placeholder="Event Name">

        </input>
      </td>
      <td>
        Date:
      </td>
      <td>
        <input type="date" class="form-control form-input-date" name="eventDateInput" aria-describedby="Name" placeholder="Date">
        </input>
      </td>

      <td>
        Location:
      </td>
      <td>
        <input type="text" class="form-control form-input-location" name="eventLocationInput" aria-describedby="Name" placeholder="Location">
        </input>
      </td>
      <td>
        Course:
      </td>
      <td>
        <select class="form-control form-input-course" name="eventCourseInput" aria-describedby="Course" placeholder="Course">
          <option value="25">25</option>
          <option value="50">50</option>
        </select>      </td>
      <td>
        <button type="submit"  id="submit_event" class="btn btn-primary">Add Event</button>
      </td>
    </tr>
  </table>
</form>
<div id="messages">

</div>
</body>
<script src="../js/add_event_form.js"></script>

</html>
