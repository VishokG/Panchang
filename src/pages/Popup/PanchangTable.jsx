import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import PTRow from './PTRow';
import tempInfo from './temp.json';
const { DateTime } = require('luxon');

console.log(tempInfo);
const PanchangTable = () => {
  const [info, setInfo] = useState(tempInfo);

  const fetchData = async () => {
    console.log('this.state.infor', this.state.info);
    const url1 = 'https://api.prokerala.com/token';
    const res = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    });
    const res1json = await res.json();

    const dt = DateTime.now();
    console.log();
    let dateTimeString = dt.toISO();
    dateTimeString = dateTimeString.replace('+', '%2B');
    const coordN = '12.9716';
    const coordE = '77.5946';

    const url2 = `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=${coordN},${coordE}&datetime=${dateTimeString}`;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + res1json.access_token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const res2 = await fetch(url2, requestOptions);
    const res2json = await res2.json();
    setInfo(res2json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table bordered size="md" className="panchangTable">
        <tbody>
          <PTRow
            top={true}
            title="Sunrise"
            content={DateTime.fromISO(info.data.sunrise).toFormat('hh:mm a')}
          />
          <PTRow
            title="Sunset"
            content={DateTime.fromISO(info.data.sunset).toFormat('hh:mm a')}
          />
          <PTRow
            title="Moonrise"
            content={DateTime.fromISO(info.data.moonrise).toFormat('hh:mm a')}
          />
          <PTRow
            title="Moonset"
            content={DateTime.fromISO(info.data.sunrise).toFormat(
              'hh:mm a, LLL d'
            )}
          />
        </tbody>
      </Table>
      <Table bordered size="md" className="panchangTable">
        <tbody>
          <PTRow
            title="Tithi"
            content={
              info.data.tithi[0].name +
              ' upto ' +
              DateTime.fromISO(info.data.tithi[0].end).toFormat(
                'hh:mm a, LLL d'
              )
            }
          />
          <PTRow
            title="Nakshatra"
            content={
              info.data.nakshatra[0].name +
              ' upto ' +
              DateTime.fromISO(info.data.nakshatra[0].end).toFormat('hh:mm a')
            }
          />
          <PTRow
            title="Yoga"
            content={
              info.data.yoga[0].name +
              ' upto ' +
              DateTime.fromISO(info.data.yoga[0].end).toFormat('hh:mm a, LLL d')
            }
          />
          <PTRow
            title="Karana"
            content={
              info.data.karana[0].name +
              ' upto ' +
              DateTime.fromISO(info.data.karana[0].end).toFormat('hh:mm a')
            }
          />
          <PTRow
            blank={true}
            title=""
            content={
              info.data.karana[1].name +
              ' upto ' +
              DateTime.fromISO(info.data.karana[1].end).toFormat(
                'hh:mm a, LLL d'
              )
            }
          />
          <PTRow title="Weekday" content={info.data.vaara} />
          {/* <PTRow title="Amanta Month" content="Margashirsha" />
          <PTRow title="Purnimanta Month" content="Margashirsha" /> */}
        </tbody>
      </Table>
    </div>
  );
};

export default PanchangTable;
