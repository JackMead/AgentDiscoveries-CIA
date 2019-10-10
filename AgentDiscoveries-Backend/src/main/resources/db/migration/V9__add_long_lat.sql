ALTER table locations
ADD COLUMN longitude decimal(9,7) AFTER site_name,
ADD COLUMN latitude decimal(9,7) AFTER longitude;
UPDATE locations
SET longitude = 90.293428, latitude = 08.2398472
WHERE location_id = 1;