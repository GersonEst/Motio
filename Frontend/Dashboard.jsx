useEffect(() => {
  const interval = setInterval(async () => {
    try {
      // Fetch gyro axes
      const sigRes = await fetch("/signal");  
      const sigData = await sigRes.json();  
      setSignal(sigData);

      // Calculate magnitude for the graph
      const magnitude = Math.sqrt(sigData[0]**2 + sigData[1]**2 + sigData[2]**2);
      historyRef.current.push(magnitude);
      if (historyRef.current.length > 100) historyRef.current.shift(); // keep last 100 points

      // Fetch tremor info
      const tremorRes = await fetch("/tremor");
      const tremorData = await tremorRes.json();
      setTremor(tremorData.tremor);
      setFrequency(tremorData.frequency.toFixed(2));
    } catch (e) {
      console.error("Error fetching data", e);
    }
  }, 500); // update every 500ms

  return () => clearInterval(interval);
}, []);
