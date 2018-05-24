package org.softwire.training.api.core;

import org.junit.jupiter.api.Test;
import org.softwire.training.models.Agent;
import org.softwire.training.models.Location;
import org.softwire.training.models.LocationStatusReport;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExecutiveSummaryBuilderTest {

    @Test
    public void testExecutiveSummaryBuilderFormatsSummaryTitle() {
        String expected =
                "Over the past 7 days there have been 13 region summary reports and 43 location status reports.\n\n" +
                "The 5 most important location status reports in this period are as follows:\n";

        ExecutiveSummaryBuilder builder = new ExecutiveSummaryBuilder();
        builder.appendSummaryTitle(7, 13, 43, 5);

        assertEquals(expected, builder.toString());
    }

    @Test
    public void testExecutiveSummaryBuilderFormatsSingleDay() {
        String expected =
                "Over the past day there have been 13 region summary reports and 43 location status reports.\n\n" +
                        "The 5 most important location status reports in this period are as follows:\n";

        ExecutiveSummaryBuilder builder = new ExecutiveSummaryBuilder();
        builder.appendSummaryTitle(1, 13, 43, 5);

        assertEquals(expected, builder.toString());
    }


    @Test
    public void testExecutiveSummaryBuilderFormatsLocationStatusReport() {
        String expected =
                "\n** Report 2 **\n\n" +
                "Submitted by: Dave Johnson (FoxHoundBloodEagle)\n" +
                "Submitted at: 2018-05-23 07:29\n" +
                "Location Name: Area 51\n" +
                "Location Status: 40\n\n" +
                "Everything going well with the new arrival\n\n";

        Agent agent = new Agent(0, "Dave", "Johnson", LocalDate.now(), 15, "FoxHoundBloodEagle");

        Location location = new Location();
        location.setLocation("Area 51");
        location.setTimeZone("US/Pacific");

        LocationStatusReport report = new LocationStatusReport();
        report.setStatus((byte) 40);
        report.setReportTime(LocalDateTime.of(2018, 5, 23, 14, 29)); // US/Pacific is -7 hours
        report.setReportBody("Everything going well with the new arrival");

        ExecutiveSummaryBuilder builder = new ExecutiveSummaryBuilder();
        builder.appendLocationStatusReport(2, report, agent, location);

        assertEquals(expected, builder.toString());
    }
}
