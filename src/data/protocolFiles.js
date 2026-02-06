export const protocolFiles = [
  {
    "id": "10-carilion-ktp-master-index",
    "title": "1.0 Carilion KTP Master Index",
    "fileName": "1.0 Carilion KTP Master Index.docx"
  },
  {
    "id": "11-program-governance-charter",
    "title": "1.1 Program Governance Charter",
    "fileName": "1.1 Program Governance Charter.docx"
  },
  {
    "id": "12-roles-and-responsibilities-of-program-leadership",
    "title": "1.2 Roles and Responsibilities of Program Leadership",
    "fileName": "1.2 Roles and Responsibilities of Program Leadership.docx"
  },
  {
    "id": "13-separation-of-donation-and-transplant-decision-making",
    "title": "1.3 Separation of Donation and Transplant Decision Making",
    "fileName": "1.3 Separation of Donation and Transplant Decision Making.docx"
  },
  {
    "id": "14-ethics-consultation-and-escalation-pathway",
    "title": "1.4 Ethics Consultation and Escalation Pathway",
    "fileName": "1.4 Ethics Consultation and Escalation Pathway.docx"
  },
  {
    "id": "15-conflict-of-interest-disclosure-policy",
    "title": "1.5 Conflict of Interest Disclosure Policy",
    "fileName": "1.5 Conflict of Interest Disclosure Policy.docx"
  },
  {
    "id": "16-equity-access-and-non-discrimination-policy",
    "title": "1.6 Equity Access and Non Discrimination Policy",
    "fileName": "1.6 Equity Access and Non Discrimination Policy.docx"
  },
  {
    "id": "17-informed-consent-framework-recipient",
    "title": "1.7 Informed Consent Framework Recipient",
    "fileName": "1.7 Informed Consent Framework Recipient.docx"
  },
  {
    "id": "18-ethical-position-statement-deceased-donation-and-kidney-transplantation",
    "title": "1.8 Ethical Position Statement Deceased Donation and Kidney Transplantation",
    "fileName": "1.8 Ethical Position Statement Deceased Donation and Kidney Transplantation.docx"
  },
  {
    "id": "21-multidisciplinary-transplant-team-structure",
    "title": "2.1 Multidisciplinary Transplant Team Structure",
    "fileName": "2.1 Multidisciplinary Transplant Team Structure.docx"
  },
  {
    "id": "22-credentialing-privileging-and-coverage-model",
    "title": "2.2 Credentialing Privileging and Coverage Model",
    "fileName": "2.2 Credentialing Privileging and Coverage Model.docx"
  },
  {
    "id": "23-ancillary-and-accessory-services",
    "title": "2.3 Ancillary and Accessory Services",
    "fileName": "2.3 Ancillary and Accessory Services.docx"
  },
  {
    "id": "24-transplant-selection-committee",
    "title": "2.4 Transplant Selection Committee",
    "fileName": "2.4 Transplant Selection Committee.docx"
  },
  {
    "id": "31-appendix-b-referral-workflow",
    "title": "3.1 Appendix B Referral Workflow",
    "fileName": "3.1 Appendix B Referral Workflow.pdf"
  },
  {
    "id": "31-appendix-c-contact-attempt-template",
    "title": "3.1 Appendix C Contact Attempt Template",
    "fileName": "3.1 Appendix C Contact Attempt Template.docx"
  },
  {
    "id": "31-appendix-d-referral-status-definitions",
    "title": "3.1 Appendix D Referral Status Definitions",
    "fileName": "3.1 Appendix D Referral Status Definitions.docx"
  },
  {
    "id": "31-appendix-e-patient-education-handout",
    "title": "3.1 Appendix E Patient Education Handout",
    "fileName": "3.1 Appendix E Patient Education Handout.docx"
  },
  {
    "id": "31-appendix-f-transfer-and-emtala-workflow",
    "title": "3.1 Appendix F Transfer and EMTALA Workflow",
    "fileName": "3.1 Appendix F Transfer and EMTALA Workflow.docx"
  },
  {
    "id": "31-referral-intake-and-access",
    "title": "3.1 Referral Intake and Access",
    "fileName": "3.1 Referral Intake and Access.docx"
  },
  {
    "id": "32-candidate-evaluation-pathway",
    "title": "3.2 Candidate Evaluation Pathway",
    "fileName": "3.2 Candidate Evaluation Pathway.docx"
  },
  {
    "id": "33-listing-criteria-and-waitlist-management",
    "title": "3.3 Listing Criteria and Waitlist Management",
    "fileName": "3.3 Listing Criteria and Waitlist Management.docx"
  },
  {
    "id": "34-deceased-donor-organ-offer-evaluation-and-acceptance-process",
    "title": "3.4 Deceased Donor Organ Offer Evaluation and Acceptance Process",
    "fileName": "3.4 Deceased Donor Organ Offer Evaluation and Acceptance Process.docx"
  },
  {
    "id": "35-living-donor-evaluation-pathway",
    "title": "3.5 Living Donor Evaluation Pathway",
    "fileName": "3.5 Living Donor Evaluation Pathway.docx"
  },
  {
    "id": "36-living-donor-paired-exchange-and-kidney-paired-donation-pathway",
    "title": "3.6 Living Donor Paired Exchange and Kidney Paired Donation Pathway",
    "fileName": "3.6 Living Donor Paired Exchange and Kidney Paired Donation Pathway.docx"
  },
  {
    "id": "41-deceased-donor-offer-intake-and-review",
    "title": "4.1 Deceased Donor Offer Intake and Review",
    "fileName": "4.1 Deceased Donor Offer Intake and Review.docx"
  },
  {
    "id": "consent-for-procedure",
    "title": "Consent for Procedure",
    "fileName": "Consent for Procedure.docx"
  }
];

export const getProtocolFileUrl = (fileName) =>
  `/protocol-files/${encodeURIComponent(fileName)}`;
