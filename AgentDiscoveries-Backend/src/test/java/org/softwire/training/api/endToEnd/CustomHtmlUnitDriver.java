package org.softwire.training.api.endToEnd;

import com.gargoylesoftware.htmlunit.WebClient;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

public class CustomHtmlUnitDriver extends HtmlUnitDriver{
    @Override
    protected WebClient modifyWebClient(WebClient client){
        WebClient modifiedClient = super.modifyWebClient(client);
        modifiedClient.getOptions().setThrowExceptionOnScriptError(false); // see here
        modifiedClient.getOptions().setThrowExceptionOnFailingStatusCode(false);
        return modifiedClient;
    }
}
