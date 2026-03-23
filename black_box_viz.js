looker.plugins.visualizations.add({
  id: "black_box_viz",
  label: "Black Box Labels",
  options: {
    box_width: {
      type: "number",
      label: "Box Width (px)",
      default: 200,
      section: "Style",
    },
    box_height: {
      type: "number",
      label: "Box Height (px)",
      default: 60,
      section: "Style",
    },
    box_gap: {
      type: "number",
      label: "Gap Between Boxes (px)",
      default: 12,
      section: "Style",
    },
    font_size: {
      type: "number",
      label: "Font Size (px)",
      default: 16,
      section: "Style",
    },
    border_radius: {
      type: "number",
      label: "Border Radius (px)",
      default: 4,
      section: "Style",
    },
  },

  create: function (element, config) {
    var container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.padding = "12px";
    container.style.boxSizing = "border-box";
    element.appendChild(container);
    // Store reference directly on element to avoid getElementById
    this._container = container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Use stored reference instead of getElementById
    var container = this._container;
    if (!container) {
      done();
      return;
    }
    container.innerHTML = "";

    var boxWidth = (config && config.box_width) || 200;
    var boxHeight = (config && config.box_height) || 60;
    var boxGap = (config && config.box_gap) || 12;
    var fontSize = (config && config.font_size) || 16;
    var borderRadius = (config && config.border_radius) || 4;

    // Get the first dimension from the query response
    if (
      !queryResponse ||
      !queryResponse.fields ||
      !queryResponse.fields.dimension_like ||
      queryResponse.fields.dimension_like.length === 0
    ) {
      container.innerHTML =
        '<p style="color:red;">No categorical dimension found.</p>';
      done();
      return;
    }

    var fieldName = queryResponse.fields.dimension_like[0].name;

    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      if (!row[fieldName]) continue;

      var value = row[fieldName].value;
      var rendered = row[fieldName].rendered || String(value);

      var box = document.createElement("div");
      box.style.cssText =
        "width:" + boxWidth + "px;" +
        "height:" + boxHeight + "px;" +
        "background-color:#000000;" +
        "color:#FFFFFF;" +
        "display:flex;" +
        "align-items:center;" +
        "justify-content:center;" +
        "margin:" + (boxGap / 2) + "px;" +
        "border-radius:" + borderRadius + "px;" +
        "font-size:" + fontSize + "px;" +
        "font-family:'Open Sans',Helvetica,Arial,sans-serif;" +
        "font-weight:600;" +
        "text-align:center;" +
        "padding:8px;" +
        "box-sizing:border-box;" +
        "overflow:hidden;" +
        "text-overflow:ellipsis;";

      box.title = rendered;
      box.innerText = rendered;
      container.appendChild(box);
    }

    done();
  },
});
