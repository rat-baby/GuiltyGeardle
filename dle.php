<?php 
  if (!session_id()) {
    session_start();
  }

  $answerData = file_get_contents('answer.json');
  if ($answerData == null) {
    die("Error accessing JSON file");
  }
  $answerObject = json_decode($answerData);
  if ($answerObject == null) {
    die("Error decoding JSON file");
  }

  date_default_timezone_set('America/Chicago');
  $today = date("d");
  $lastDay = $answerObject->lastUpdated;

  if ($lastDay < $today || ($today == 1 && $lastDay != 1)) {
    $answerObject->character = rand(0,32);
    $answerObject->lastUpdated = $today;

    $outData = json_encode($answerObject);
    file_put_contents('answer.json', $outData);
  }

?> 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="css/style.css">
  <title>Guilty Geardle</title>
</head>
<body>
  <div class='wrapper'>
    <h1>Guilty Geardle</h1>
    <br>
    <input type="text" name="selection" required placeholder="Sol Badguy" autocomplete="off" class="inputBox">
    <input type="submit" value="Fight!" name="submit" id="submit">
    <div class="selectorBox" hidden></div>
    <br>
    <table class="resultsTable">
      <tr>
        <th>Character</th>
        <th>Archetype</th>
        <th>Ease of Use</th>
        <th>Season Added</th>
      </tr>
    </table>
  </div>
  <script src="js/base.js"></script>
  <script src="js/jquery.js"></script>
</body>
</html>