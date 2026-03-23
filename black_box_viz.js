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
    element.innerHTML = "";
    const container = document.createElement("div");
    container.id = "black-box-container";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.padding = "12px";
    container.style.boxSizing = "border-box";
    element.appendChild(container);
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const container = document.getElementById("black-box-container");
    container.innerHTML = "";

    const boxWidth = config.box_width || 200;
    const boxHeight = config.box_height || 60;
    const boxGap = config.box_gap || 12;
    const fontSize = config.font_size || 16;
    const borderRadius = config.border_radius || 4;

    // Get the first dimension from the query response
    const dimension = queryResponse.fields.dimension_like[0];
    if (!dimension) {
      container.innerHTML = '<p style="color:red;">No categorical dimension found.</p>';
      done();
      return;
    }

    const fieldName = dimension.name;

    data.forEach(function (row) {
      const value = row[fieldName].value;
      const rendered = row[fieldName].rendered || String(value);

      const box = document.createElement("div");
      box.style.width = boxWidth + "px";
      box.style.height = boxHeight + "px";
      box.style.backgroundColor = "#000000";
      box.style.color = "#FFFFFF";
      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.margin = (boxGap / 2) + "px";
      box.style.borderRadius = borderRadius + "px";
      box.style.fontSize = fontSize + "px";
      box.style.fontFamily = "'Open Sans', Helvetica, Arial, sans-serif";
      box.style.fontWeight = "600";
      box.style.textAlign = "center";
      box.style.padding = "8px";
      box.style.boxSizing = "border-box";
      box.style.overflow = "hidden";
      box.style.textOverflow = "ellipsis";
      box.title = rendered;

      box.innerText = rendered;
      container.appendChild(box);
    });

    done();
  },
});
