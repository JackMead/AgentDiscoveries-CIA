package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
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

    private final RegionsDao regionsDao;
    private final PermissionsVerifier permissionsVerifier;

    @Inject
    public RegionsRoutes(RegionsDao regionsDao, PermissionsVerifier permissionsVerifier) {
        this.regionsDao = regionsDao;
        this.permissionsVerifier=permissionsVerifier;
    }

    public Region createRegion(Request req, Response res) throws FailedRequestException {
        permissionsVerifier.verifyAdminPermission(req);
        Region region = JsonRequestUtils.readBodyAsType(req, Region.class);

        if (region.getRegionId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "regionId cannot be specified on create");
        }

        int newRegionId = regionsDao.createRegion(region);

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

    public Region updateRegion(Request req, Response res, int id) throws FailedRequestException {
        Region region = JsonRequestUtils.readBodyAsType(req, Region.class);
        region.setRegionId(id);

        regionsDao.updateRegion(region);

        return region;
    }

    public Object deleteRegion(Request req, Response res, int id) throws FailedRequestException {
        permissionsVerifier.verifyAdminPermission(req);
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Region delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        regionsDao.deleteRegion(id);
        res.status(204);

        return new Object();
    }
}
