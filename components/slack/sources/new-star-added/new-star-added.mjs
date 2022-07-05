import common from "../common/base.mjs";

export default {
  ...common,
  key: "slack-new-star-added",
  name: "New Star Added (Instant)",
  version: "0.0.2",
  description: "Emit new event when a star is added to an item",
  type: "source",
  dedupe: "unique",
  props: {
    ...common.props,
    // eslint-disable-next-line pipedream/props-description,pipedream/props-label
    slackApphook: {
      type: "$.interface.apphook",
      appProp: "slack",
      async eventNames() {
        return [
          "star_added",
        ];
      },
    },
  },
  methods: {
    ...common.methods,
    getSummary(event) {
      let type = (event.item.type === "im")
        ? "user"
        : event.item.type;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      return `New star added - ${type}`;
    },
  },
};
