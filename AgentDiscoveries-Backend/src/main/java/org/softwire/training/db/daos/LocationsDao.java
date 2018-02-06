package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Location;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class LocationsDao {

    @Inject
    Jdbi jdbi;

    public Optional<Location> getLocation(int locationId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM location WHERE location_id = :location_id")
                    .bind("location_id", locationId)
                    .mapToBean(Location.class)
                    .findFirst();
        }
    }

    public List<Location> getLocations() {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM location")
                    .mapToBean(Location.class)
                    .list();
        }
    }

    public int addLocation(Location location) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO location (location, site_name, time_zone) " +
                    "VALUES (:location, :site_name, :time_zone)")
                    .bind("location", location.getLocation())
                    .bind("site_name", location.getSiteName())
                    .bind("time_zone", location.getTimeZone())
                    .executeAndReturnGeneratedKeys("location_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public int deleteLocation(int locationId) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("DELETE FROM location WHERE location_id = :location_id")
                    .bind("location_id", locationId)
                    .execute();
        }
    }

    public int updateLocation(Location location) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("UPDATE location SET location = :location, site_name = :site_name, " +
                    "time_zone = :time_zone WHERE location_id = :location_id")
                    .bind("location_id", location.getLocationId())
                    .bind("location", location.getLocation())
                    .bind("site_name", location.getSiteName())
                    .bind("time_zone", location.getTimeZone())
                    .execute();
        }
    }

    public List<Integer> findWhichLocationIdsExist(List<Integer> locationIdsToSearchFor) {
        if (locationIdsToSearchFor.isEmpty()) {
            // Cannot bind empty lists so manually return no locations when provided empty list
            return new ArrayList<>();
        }

        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT location_id FROM location WHERE location_id IN (<locations>)")
                    .bindList("locations", locationIdsToSearchFor)
                    .mapTo(Integer.class)
                    .list();
        }
    }
}
