package org.softwire.training.api.routes.v1;

import org.eclipse.jetty.server.Authentication;
import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.models.Location;
import org.softwire.training.db.daos.RegionsDao;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.time.DateTimeException;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

public class LocationsRoutes implements EntityCRUDRoutes {

    private final LocationsDao locationsDao;
    private final PermissionsVerifier permissionsVerifier;
    private final RegionsDao regionsDao;

    @Inject
    public LocationsRoutes(LocationsDao locationsDao, PermissionsVerifier permissionsVerifier, RegionsDao regionsDao) {
        this.locationsDao = locationsDao;
        this.permissionsVerifier = permissionsVerifier;
        this.regionsDao = regionsDao;
    }

    @Override
    public Location createEntity(Request req, Response res) {
        permissionsVerifier.verifyAdminPermission(req);
        Location location = JsonRequestUtils.readBodyAsType(req, Location.class);

        if (location.getLocationId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "locationId cannot be specified on create");
        }

        // Perform validations of model before storing
        validateLocationModel(location);

        int newLocationId = locationsDao.createLocation(location);

        // Create requests should return 201
        res.status(201);
        location.setLocationId(newLocationId);

        return location;
    }

    @Override
    public Location readEntity(Request req, Response res, int id) {
        return locationsDao.getLocation(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Location not found"));
    }

    @Override
    public List<Location> readEntities(Request req, Response res){
        return locationsDao.getLocations();
    }

    @Override
    public Location updateEntity(Request req, Response res, int id) {

        Location location = JsonRequestUtils.readBodyAsType(req, Location.class);

        if (location.getLocationId() != id && location.getLocationId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "locationId cannot be specified differently to URI");
        }
        // Perform validations of model before storing
        validateLocationModel(location);

        location.setLocationId(id);
        locationsDao.updateLocation(location);

        return location;
    }

    private void validateLocationModel(Location location) {

        if(regionsDao.getRegion(location.getRegionId()).equals(Optional.empty())){
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "this regionId doesn't exist, try again");
        }

        if (location.getSiteName().length() > 20) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "site name is too long (max 20 chars).");
        }

        if (StringUtils.isEmpty(location.getTimeZone())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "timeZone must be specified for location");
        }

        try {
            ZoneId.of(location.getTimeZone());
        } catch (DateTimeException e) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "timeZone '" + location.getTimeZone() + "' is invalid", e);
        }
    }

    @Override
    public Object deleteEntity(Request req, Response res, int id) {
        locationsDao.deleteLocation(id);
        res.status(204);

        return new Object();
    }
}
