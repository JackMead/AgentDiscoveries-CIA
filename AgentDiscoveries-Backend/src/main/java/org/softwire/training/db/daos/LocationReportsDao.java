package org.softwire.training.db.daos;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.LocationStatusReport;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class LocationReportsDao implements ReportsDao<LocationStatusReport> {

    private EntityManagerFactory entityManagerFactory;
    private DaoHelper<LocationStatusReport> helper;

    @Inject
    public LocationReportsDao(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<LocationStatusReport> getReport(int reportId) {
        return helper.getEntity(LocationStatusReport.class, reportId);
    }

    public int createReport(LocationStatusReport report) {
        helper.createEntity(report);
        return report.getReportId();
    }

    public void deleteReport(int reportId) {
        helper.deleteEntity(LocationStatusReport.class, reportId);
    }

    public List<LocationStatusReport> searchReports(List<ReportSearchCriterion> searchCriteria) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();

        String whereClause = ReportsDaoUtils.buildWhereSubClauseFromCriteria(searchCriteria);

        TypedQuery<LocationStatusReport> query = em.createQuery("FROM LocationStatusReport " + whereClause, LocationStatusReport.class);

        for (ReportSearchCriterion criterion : searchCriteria) {
            for (Map.Entry<String, Object> bindingEntry : criterion.getBindingsForSql().entrySet()) {
                query = query.setParameter(bindingEntry.getKey(), bindingEntry.getValue());
            }
        }

        List<LocationStatusReport> results = query.getResultList();

        em.getTransaction().commit();
        em.close();

        return results;
    }
}
