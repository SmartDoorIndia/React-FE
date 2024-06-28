// var timMillis;
var counter = 0;

class TimeStampAlgo {
  getCounter() {
    counter++;
    if (counter < 10) return "000000" + counter.toString();
    else if (counter < 100) return "00000" + counter.toString();
    else if (counter < 1000) return "0000" + counter.toString();
    else if (counter < 10000) return "000" + counter.toString();
    else if (counter < 100000) return "00" + counter.toString();
    else if (counter < 1000000) return "0" + counter.toString();
    else if (counter < 10000000) return counter.toString();
    else {
      counter = 1;
      return "00000" + counter.toString();
    }
  }

  getTimMillis() {
    // timMillis = Date.now();
    // console.log(new Date().toUTCString().millisecond.toString());

    const dt = new Date();
    console.log("dt.getMilliseconds:", dt.getMilliseconds());
    const mlsec = dt.getMilliseconds();
    return this.getCounter() + mlsec.toString();
  }
}

export default TimeStampAlgo;
