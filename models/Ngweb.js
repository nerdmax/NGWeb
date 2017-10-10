const mongoose = require('mongoose');

const ngwebSchema = new mongoose.Schema({
  templateWebNames: Array,
  templateWebName: String,
  newWebName: String,
  templateDbName: String,
  newDbName: String,
  favicon: String,
  weblogo: String,
  portNO: String,
  resetPassEmail: String,
  database: {
    databaseName: String,
    databaseUsername: String,
    databasePassword: String
  },
  blob: {
    blobAddress: String,
    blobAccountKey: String,
  },
  styleSettings: {
    colorSettings: {
      darkColor1: String,
      darkColor2: String,
      darkColor3: String,
      lightColor1: String,
      lightColor2: String,
      lightColor3: String,
      globalHoverColor1: String,
      globalHoverColor2: String
    },
    otherSettings: {
      globalTextShadow1: String,
    },
    themeSettings: {
      bgColor: {
        theme1BgColor: String,
        theme2BgColor: String,
        theme3BgColor: String,
        theme4BgColor: String,
      },
      bgGradient: {
        theme1BgGradient: String,
        theme2BgGradient: String,
        theme3BgGradient: String,
        theme4BgGradient: String,
      },
      bgGradientDetails: {
        theme1BgGradientDetails: String,
        theme2BgGradientDetails: String,
        theme3BgGradientDetails: String,
        theme4BgGradientDetails: String,
      },
      h1TextColor: {
        theme1H1TextColor: String,
        theme2H1TextColor: String,
        theme3H1TextColor: String,
        theme4H1TextColor: String,
      },
      h2TextColor: {
        theme1H2TextColor: String,
        theme2H2TextColor: String,
        theme3H2TextColor: String,
        theme4H2TextColor: String,
      },
      h3TextColor: {
        theme1H3TextColor: String,
        theme2H3TextColor: String,
        theme3H3TextColor: String,
        theme4H3TextColor: String,
      },
      h4TextColor: {
        theme1H4TextColor: String,
        theme2H4TextColor: String,
        theme3H4TextColor: String,
        theme4H4TextColor: String,
      },
      pTextColor: {
        theme1PTextColor: String,
        theme2PTextColor: String,
        theme3PTextColor: String,
        theme4PTextColor: String,
      },
      hyperLinkTextColor: {
        theme1HyperlinkTextColor: String,
        theme2HyperlinkTextColor: String,
        theme3HyperlinkTextColor: String,
        theme4HyperlinkTextColor: String,
      },
      hyperLinkHoverColor: {
        theme1HyperlinkHoverColor: String,
        theme2HyperlinkHoverColor: String,
        theme3HyperlinkHoverColor: String,
        theme4HyperlinkHoverColor: String,
      },
      IconTextColor: {
        theme1IconTextColor: String,
        theme2IconTextColor: String,
        theme3IconTextColor: String,
        theme4IconTextColor: String,
      },
      buttonTextColor: {
        theme1ButtonTextColor: String,
        theme2ButtonTextColor: String,
        theme3ButtonTextColor: String,
        theme4ButtonTextColor: String,
      },
      buttonTextHoverColor: {
        theme1ButtonTextHoverColor: String,
        theme2ButtonTextHoverColor: String,
        theme3ButtonTextHoverColor: String,
        theme4ButtonTextHoverColor: String,
      },
      buttonBgColor: {
        theme1ButtonBgColor: String,
        theme2ButtonBgColor: String,
        theme3ButtonBgColor: String,
        theme4ButtonBgColor: String,
      },
      buttonBgGradient: {
        theme1ButtonBgGradient: String,
        theme2ButtonBgGradient: String,
        theme3ButtonBgGradient: String,
        theme4ButtonBgGradient: String,
      },
      buttonBgGradientDetails: {
        theme1ButtonBgGradientDetails: String,
        theme2ButtonBgGradientDetails: String,
        theme3ButtonBgGradientDetails: String,
        theme4ButtonBgGradientDetails: String,
      },
      buttonBgHoverColor: {
        theme1ButtonBgHoverColor: String,
        theme2ButtonBgHoverColor: String,
        theme3ButtonBgHoverColor: String,
        theme4ButtonBgHoverColor: String,
      },
      buttonIs3D: {
        theme1ButtonIs3D: String,
        theme2ButtonIs3D: String,
        theme3ButtonIs3D: String,
        theme4ButtonIs3D: String,
      }
    },
    headerSettings: {
      haderBackground: {
        navBackgroundColor: String,
      },
      topHeader: {
        navContactFontColor: String,
        navContactFontHoverColor: String,
        navContactIconColor: String,
        navContactIconHoverColor: String,
        navWatchlistFontColor: String,
        navWatchlistFontHoverColor: String,
        navWatchlistIconColor: String,
        navWatchlistIconHoverColor: String,
      },
      bottomHeader: {
        navFontColor: String,
        navFontHoverColor: String,
        navSecondFontColor: String,
        navSecondFontHoverColor: String,
        navMobileFontColor: String,
        navMobileFontHoverColor: String,
        navMobileSecondFontColor: String,
        navMobileSecondFontHoverColor: String,
        navToggleButtonColor: String,
        navToggleButtonBgColor: String,
      }
    },
    footerSettings: {
      footerBackground: {
        footerBgColor: String,
        footerMianBackGroundColor: String,
        footerMainBottomDividerColor: String,
        footerBottomBackgroundColor: String,
      },
      footerColor: {
        footerFontColor: String,
        footerFontHoverColor: String,
        footerIconColor: String,
        footerIconHoverColor: String,
        footerRoundIconColor: String,
        footerRoundIconBgColor: String,
        footerRoundIconHoverColor: String,
        footerRoundIconBgHoverColor: String,
      }
    }
  }
}, { timestamps: true });

const Ngweb = mongoose.model('Ngweb', ngwebSchema);

module.exports = Ngweb;
