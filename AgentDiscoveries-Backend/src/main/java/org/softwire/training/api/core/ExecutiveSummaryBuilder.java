package org.softwire.training.api.core;

import org.softwire.training.models.Agent;
import org.softwire.training.models.Location;
import org.softwire.training.models.LocationStatusReport;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

/**
 * Class for building an Executive Summary.
 *
 * Note that this is *single-use* and not thread safe.
 */
public class ExecutiveSummaryBuilder {

    private final StringBuilder builder = new StringBuilder();

    public void appendSummaryTitle(
            int numberOfDays,
            int regionSummaryReportCount,
            int locationStatusReportCount,
            int importantReportCount) {

        builder.append("Over the past ");
        if (numberOfDays == 1) {
            builder.append("day");
        } else {
            builder.append(numberOfDays).append(" days");
        }
        builder.append(" there have been ").append(regionSummaryReportCount);
        builder.append(" region summary reports and ").append(locationStatusReportCount);
        builder.append(" location status reports.\n\n");
        builder.append("The ").append(importantReportCount);
        builder.append(" most important location status reports in this period are as follows:\n");
    }

    public void appendLocationStatusReport(
            int index,
            LocationStatusReport locationStatusReport,
            Agent agent,
            Location location) {

        builder.append("\n** Report ").append(index).append(" **\n\n");
        builder.append("Submitted by: ").append(agent.getFirstName()).append(" ").append(agent.getLastName());
        builder.append(" (").append(agent.getCallSign()).append(")");

        builder.append("\nSubmitted at: ").append(locationStatusReport.getReportTime()
                .atZone(ZoneId.of(location.getTimeZone()))
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));

        builder.append("\nLocation Name: ").append(location.getLocation());
        builder.append("\nLocation Status: ").append(locationStatusReport.getStatus());

        builder.append("\n\n");
        builder.append(locationStatusReport.getReportBody());
        builder.append("\n\n");
    }

    @Override
    public String toString() {
        return builder.toString();
    }
}
