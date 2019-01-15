<?php
echo '
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<form  id="add_swimmer_form" method="post" action="#">
  <table id="form_table" class="add-swimmer-table input-group">
    <tr>
      <td>
        First Name:
      </td>
      <td>
        <input type="text" class="form-control form-input-name" name="firstNameInput" aria-describedby="First Name" placeholder="First Name">
        </input>
      </td>
      <td>
        Last Name:
      </td>
      <td>

        <input type="text" class="form-control form-input-date" name="lastNameInput" aria-describedby="Last Name" placeholder="Last Name">
        </input>
      </td>


      <td>
        Gender:
      </td>
      <td>
        <select class="form-control form-input-course" name="genderInput" aria-describedby="Gender" placeholder="Gender">
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        Date of Birth:
      </td>
      <td>
        <input type="number" class="form-control form-input-location" name="birthDayInput" aria-describedby="Birth Day" placeholder="Day">
        </input>
      </td>
      <td>
        <input type="number" class="form-control form-input-location" name="birthMonthInput" aria-describedby="Birth Month" placeholder="Month">
        </input>
      </td>
      <td>
        <input type="number" class="form-control form-input-location" name="birthYearInput" aria-describedby="Birth Year" placeholder="Year">
        </input>
      </td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>
        <input type="text" class="form-control form-input-location" name="emailInput" aria-describedby="email" placeholder="Email">
        </input>
      </td>

      <td>
        <button type="submit"  id="submit_swimmer" class="btn btn-primary">Add Swimmer</button>
      </td>

    </tr>
  </table>
</form>
<div id="messages">

</div>
</form>
<script src="../js/add_swimmer_form.js"></script>

';
