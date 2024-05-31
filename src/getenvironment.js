async function getEnvironment() {
  console.log('Determining environment...');
  const currentURL = window.location.href;
  const production = 'https://nitjtt.onrender.com';
  const nitjServer = 'https://xceed.nitj.ac.in';
  const timeout = 5000; // 5 seconds timeout

  if (currentURL.includes('localhost')) {
      console.log('Environment: Production (localhost)');
      return production;
  } else if (currentURL.includes('nitjtt')) {
      console.log('Environment: Production (nitjtt)');
      return production;
  } else {
      try {
          // Create a promise that rejects in <timeout> milliseconds
          const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Request timed out')), timeout)
          );

          console.log('Checking nitjServer...');
          // Attempt to fetch the URL and race it against the timeout
          const response = await Promise.race([
              fetch(nitjServer, { method: 'HEAD' }),
              timeoutPromise
          ]);

          if (response.ok) {
              console.log('Environment: nitjServer');
              return nitjServer;
          } else {
              throw new Error('Server response not OK');
          }
      } catch (error) {
          console.error('Error or timeout:', error);
          // If there is an error (including timeout), fallback to production
          console.log('Environment: Production (fallback)');
          return production;
      }
  }
}

export default getEnvironment;
