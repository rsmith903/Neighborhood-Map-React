<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  if ($request === "Oddfellows") {
    $request = 'oddfellows-dallas';
  }
  if ($request === 'Pecan Lodge') {
    $request = 'pecan-lodge-dallas-2';
  }
  if ($request === 'Velvet Taco') {
    $request = 'velvet-taco-dallas';
  }
  if ($request === 'Meso Maya') {
    $request = 'meso-maya-dallas';
  }
  if ($request === 'Perrys Steakhouse And  Grille') {
    $request = 'perrys-steakhouse-and-grille-dallas-3';
  }
  function get_data($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer V6gG-2WIXNCp-23JV-zI6sNtz3Yj3QNCGcXlbsdwEJ48ZGdus7OvgEAHyhvDHYZnaXCxJClqfCZW_y1R2KAHvMh__HbDTYcDj24srL3Ryrqkt6CqUOFpD23TUlVyWnYx'));
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
  echo get_data('https://api.yelp.com/v3/businesses/'.$request);
?>
