package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.db.daos.RegionsDao;
import org.softwire.training.models.Location;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.util.List;
import java.util.TimeZone;

public class LocationsRoutes implements EntityCRUDRoutes {

    private static final String GMT_TIME_ZONE = "GMT";

    private final LocationsDao locationsDao;
    private final RegionsDao regionsDao;

    @Inject
    public LocationsRoutes(LocationsDao locationsDao, RegionsDao regionsDao) {
        this.locationsDao = locationsDao;
        this.regionsDao = regionsDao;
    }

    @Override
    public Location createEntity(Request req, Response res) throws FailedRequestException {
        Location location = JsonRequestUtils.readBodyAsType(req, Location.class);

        if (location.getLocationId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "locationId cannot be specified on create");
        }

        // Perform validations of model before storing
        validateLocationModel(location);

        int newLocationId = locationsDao.addLocation(location);

        // Create requests should return 201
        res.status(201);
        location.setLocationId(newLocationId);

        return location;
    }

    @Override
    public Location readEntity(Request req, Response res, int id) throws FailedRequestException {
        return locationsDao.getLocation(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Location not found"));
    }

    public List<Location> readEntities(Request req, Response res){
        return locationsDao.getLocations();
    }

    @Override
    public Location updateEntity(Request req, Response res, int id) throws FailedRequestException {
        Location location = JsonRequestUtils.readBodyAsType(req, Location.class);

        if (location.getLocationId() != id && location.getLocationId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be specified differently to URI");
        }
        // Perform validations of model before storing
        validateLocationModel(location);

        location.setLocationId(id);
        locationsDao.updateLocation(location);

        return location;
    }

    private void validateLocationModel(Location location) throws FailedRequestException {
        if (StringUtils.isEmpty(location.getTimeZone())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "timeZone must be specified for location");
        }

        String timeZoneString = location.getTimeZone();
        TimeZone zone = TimeZone.getTimeZone(timeZoneString);

        // TimeZone.getTimeZone returns GMT for invalid TimeZones, so reject if result is GMT, but the ID wasn't GMT
        if (GMT_TIME_ZONE.equals(zone.getID()) && !GMT_TIME_ZONE.equals(location.getTimeZone())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "timeZone '" + timeZoneString + "' is invalid");
        }
    }

    @Override
    public Object deleteEntity(Request req, Response res, int id) throws Exception {
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "User delete request should have no body");
        }

        // Check if this location ID is used in reports or regions
        if (regionsDao.regionExistWithLocationId(id)) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Location is part of an existing region");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        locationsDao.deleteLocation(id);
        res.status(204);

        return new Object();
    }

}
