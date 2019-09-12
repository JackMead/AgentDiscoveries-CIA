package org.softwire.training.db.daos;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.RegionSummaryReport;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class RegionSummaryReportsDao implements ReportsDao<RegionSummaryReport> {

    private EntityManagerFactory entityManagerFactory;
    private DaoHelper<RegionSummaryReport> helper;

    @Inject
    public RegionSummaryReportsDao(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<RegionSummaryReport> getReport(int reportId) {
        return helper.getEntity(RegionSummaryReport.class, reportId);
    }

    public int createReport(RegionSummaryReport report) {
        helper.createEntity(report);
        return report.getReportId();
    }

    public void deleteReport(int reportId) {
        helper.deleteEntity(RegionSummaryReport.class, reportId);
    }

    public List<RegionSummaryReport> searchReports(List<ReportSearchCriterion> searchCriteria) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();

        String whereClause = ReportsDaoUtils.buildWhereSubClauseFromCriteria(searchCriteria);

        TypedQuery<RegionSummaryReport> query = em.createQuery("FROM RegionSummaryReport " + whereClause, RegionSummaryReport.class);

        for (ReportSearchCriterion criterion : searchCriteria) {
            for (Map.Entry<String, Object> bindingEntry : criterion.getBindingsForSql().entrySet()) {
                query = query.setParameter(bindingEntry.getKey(), bindingEntry.getValue());
            }
        }

        List<RegionSummaryReport> results = query.getResultList();

        em.getTransaction().commit();
        em.close();

        return results;
    }
}
