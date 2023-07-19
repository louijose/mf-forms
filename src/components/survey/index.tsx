"use client";
import { useCallback, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

const surveyJson = {
  title: "marketfeed.",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "name",
          title: "Full Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "email",
          title: "Email",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "mobile",
          title: "Mobile Number",
          isRequired: true,
          inputType: "tel",
        },
      ],
    },
  ],
};

interface SurveyResult {
  name: string;
  email: string;
  mobile: string;
}

const getUtmParams = () => {
  const currentUrl = new URL(window.location.href);
  const params = new URLSearchParams(currentUrl.search);
  const utmParams = {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    term: params.get("utm_term"),
    content: params.get("utm_content"),
  };
  return utmParams;
};

function SurveyForm() {
  const customCss = {
    question: {
      title: "question-title",
    },
  };

  const survey = new Model(surveyJson);

  survey.css = customCss;

  const alertResults = useCallback((sender) => {
    const results: SurveyResult = sender.data;
    // result = "{"name":"test","mobile":"09995575776","email":"louijose@gmail.com"}"
    const utmParams = getUtmParams();

    var new_contact = {
      "First name": results.name,
      "Last name": results.name,
      Email: results.email,
      Phone: results.mobile,
      "Original medium": utmParams.medium,
      "Original source": utmParams.source,
      "Original campaign": utmParams.campaign,
      "Lifecycle Stage": "Form 2",
      Status: "Lead",
    };
    if (window.fwcrm) window.fwcrm.set(new_contact.Email, new_contact);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default SurveyForm;
