  ALTER TABLE locations
  ADD COLUMN longitude decimal(9,7) AFTER site_name ,
  ADD COLUMN latitude decimal(9,7) AFTER longitude;