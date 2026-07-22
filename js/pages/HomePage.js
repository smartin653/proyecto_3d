import Page from "./Page.js";

export default class HomePage extends Page {
 static config = {
    experience: true,
    header: false,
    footer: false
}

  create() {
    super.create();
}
}
