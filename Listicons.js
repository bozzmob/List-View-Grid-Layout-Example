'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  AppRegistry,
  Text,
  View,
} = React;

var THUMB_URLS = [
  'https://en.opensuse.org/images/1/1d/Skype-icon-128x128.png',
  'http://www.openwebanalytics.com/wp-content/plugins/owa/modules/base/i/browsers/128x128/ie4.png',
  'http://e38.ru/files/imagecache/192x192/files/pictures/picture-2293.jpg',
  'http://mib.pianetalinux.org/blog/images/stories/d/darktable-128x128.png',
  'http://kansascitysnowcones.com/wp-content/uploads/2012/06/128x128-youtube.png',
  'http://vectorlogo.biz/wp-content/uploads/2013/01/NEW-INTEL-VECTORLOGO-DOT-BIZ-128x128.png',
  'http://www.iconesbr.net/iconesbr/2008/08/4328/4328_128x128.png',
  'http://www.justinparks.com/wp-content/uploads/2009/10/google-badge-128x128.png',
  'http://citruspay.com/DevelopersGuide/citrusjs/images/logo@2x.png',
  'https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2014/May/02/coronium-mongo-demo-logo-469707550-0_avatar.png',
  'http://www.mstoic.com/wp-content/uploads/2013/07/Speed-128x128.png',
  'http://icons.iconarchive.com/icons/giannis-zographos/german-football-club/128/Eintracht-Frankfurt-icon.png',
];

var Listicons = React.createClass({

  statics: {
    title: '<ListView> - Grid Layout',
    description: 'Flexbox grid layout.'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = {
      uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    };
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
});

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

//AppRegistry.registerComponent('ListViewGridLayoutExample', () => ListViewGridLayoutExample);
module.exports = Listicons;