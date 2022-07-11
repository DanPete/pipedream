import quickbooks from "../../quickbooks.app.mjs";
import { ConfigurationError } from "@pipedream/platform";

export default {
  key: "quickbooks-get-purchase",
  name: "Get Purchase",
  description: "Returns info about a purchase. [See docs here](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/purchase#read-a-purchase)",
  version: "0.1.2",
  type: "action",
  props: {
    quickbooks,
    purchaseId: {
      label: "Purchase ID",
      type: "string",
      description: "Id of the purchase to get details of.",
    },
    minorversion: {
      label: "Minor Version",
      type: "string",
      description: "Use the `minorversion` query parameter in REST API requests to access a version of the API other than the generally available version. For example, to invoke minor version 1 of the JournalEntry entity, issue the following request:\n`https://quickbooks.api.intuit.com/v3/company/<realmId>/journalentry/entityId?minorversion=1`",
      optional: true,
    },
  },
  async run({ $ }) {
    if (!this.purchaseId) {
      throw new ConfigurationError("Must provide purchaseId parameter.");
    }

    const response = await this.quickbooks.getBill({
      $,
      purchaseId: this.purchaseId,
      params: {
        minorversion: this.minorversion,
      },
    });

    if (response) {
      $.export("summary", "Successfully retrieved purchase");
    }

    return response;
  },
};
