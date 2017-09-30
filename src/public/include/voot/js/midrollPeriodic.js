window.mw.kalturaPluginWrapper(function () {
  window.mw.PluginManager.add('midrollPeriodic', window.mw.KBasePlugin.extend({
    period: 6 * 60, // in seconds
    sourceUrl: null,
    setup: function setup() {
      this.addBindings();
    },
    addBindings: function addBindings() {
      this.bind('SourceSelected', $.proxy(this.onSourceSelected, this));
      this.bind('durationChange', $.proxy(this.onDurationChange, this));
    },

    onSourceSelected: function onSourceSelected(event, media) {
      if (media) {
        this.lastDuration = null;
        this.setCuePoints();
      }
    },

    onDurationChange: function onDurationChange(event, newDuration) {
      this.setCuePoints();
    },

    setCuePoints: function setCuePoints() {
      let sourceUrl = this.getConfig('sourceUrl');
      let tags = this.embedPlayer.getRawKalturaConfig( "proxyData", "Tags");
      let $tags = this.midrollPeriodicData({"Tags": tags});
      if (!sourceUrl)   return;
      let rawCuePoints = [];
      let i = 0;
      $tags.forEach(function($tagTime,k)
      {
        $tagTime = $tagTime.split('.');
        ++i;
        $tagTime = (parseInt($tagTime[0]*60)+parseInt($tagTime[1]))* 1000;
        rawCuePoints.push({
          id: i,
          protocolType: 1,
          adType: 1,
          cuePointType: 'adCuePoint.Ad',

          startTime: $tagTime,
          sourceUrl: sourceUrl+'&rnd='+Math.random(),
        });
      });
      this.embedPlayer.kCuePoints = new window.mw.KCuePoints(this.embedPlayer);
      this.embedPlayer.rawCuePoints = rawCuePoints;
      this.embedPlayer.triggerHelper('KalturaSupport_CuePointsReady');
    },
    midrollPeriodicData: function(a) {
      let b = [];
      return "undefined" != typeof a.Tags && "undefined" != a.Tags && null != a.Tags && "" != a.Tags &&
      a.Tags.forEach(function(c,a) {
        0 == c.Key.indexOf("AdCueTime") && (b[c.Key.replace("AdCueTime", "") - 1] = c.Value);
      }),
        b;
    },

  }));
});
