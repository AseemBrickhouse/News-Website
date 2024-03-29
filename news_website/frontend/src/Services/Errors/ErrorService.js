const errorService = {
  logError: (error) => {
    console.error("An error occurred:", error);
  },
  displayError: (message) => {
    alert(`Error: ${message}`);
  },

  retryRequest: (request, maxRetries = 3) => {
    let retries = 0;

    const retry = () => {
      request()
        .then((response) => {
          console.log("Request successful:", response);
        })
        .catch((error) => {
          if (retries < maxRetries) {
            console.warn("Retrying request...");
            retries++;
            retry();
          } else {
            console.error("Max retries exceeded:", error);
            errorService.displayError(
              "Failed to fetch data. Please try again later."
            );
          }
        });
    };

    retry();
  },
};

export default errorService;
