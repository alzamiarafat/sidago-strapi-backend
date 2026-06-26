import React from "react";
import { CheckCircle, CrossCircle } from "@strapi/icons";
import { Flex } from "@strapi/design-system";

const BOOLEAN_FIELDS = new Set(["marketUpdates", "researchInsights"]);

function BooleanStatusIcon({ value }) {
  return (
    <Flex justifyContent="center" width="100%">
      {value ? (
        <CheckCircle
          aria-label="Yes"
          width="1.25rem"
          height="1.25rem"
          fill="#328048"
        />
      ) : (
        <CrossCircle
          aria-label="No"
          width="1.25rem"
          height="1.25rem"
          fill="#d02b20"
        />
      )}
    </Flex>
  );
}

export default {
  config: {},
  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/ListView/inject-column-in-table",
      ({ displayedHeaders, layout }) => ({
        displayedHeaders: displayedHeaders.map((header) => {
          const isNewsletterBoolean =
            header.attribute?.type === "boolean" &&
            BOOLEAN_FIELDS.has(header.name);

          if (!isNewsletterBoolean) {
            return header;
          }

          return {
            ...header,
            sortable: false,
            cellFormatter: (row, column) => (
              <BooleanStatusIcon value={Boolean(row[column.name])} />
            ),
          };
        }),
        layout,
      }),
    );
  },
};
