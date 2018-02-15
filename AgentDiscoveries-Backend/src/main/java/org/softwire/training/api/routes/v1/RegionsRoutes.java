package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.db.daos.RegionsDao;
import org.softwire.training.models.Region;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.util.List;

public class RegionsRoutes {

    private final LocationsDao locationsDao;
    private final RegionsDao regionsDao;

    @Inject
    public RegionsRoutes(LocationsDao locationsDao, RegionsDao regionsDao) {
        this.locationsDao = locationsDao;
        this.regionsDao = regionsDao;
    }

    public Region createRegion(Request req, Response res) throws FailedRequestException {
        Region region = JsonRequestUtils.readBodyAsType(req, Region.class);

        if (region.getRegionId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "regionId cannot be specified on create");
        }

        // Verify all locations actually exist
        List<Integer> foundLocations = locationsDao.findWhichLocationIdsExist(region.getLocations());
        if (foundLocations.size() < region.getLocations().size()) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Not all specified locations exist");
        }

        int newRegionId = regionsDao.addRegion(region);

        // Create requests should return 201
        region.setRegionId(newRegionId);
        res.status(201);

        return region;
    }

    public Region readRegion(Request req, Response res, int id) throws FailedRequestException {
        return regionsDao.getRegion(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Region not found"));
    }

    public List<Region> readRegions(Request req, Response res) {
        return regionsDao.getRegions();
    }

    public Object deleteRegion(Request req, Response res, int id) throws FailedRequestException {
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Region delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        regionsDao.deleteRegion(id);
        res.status(204);

        return new Object();
    }
}
