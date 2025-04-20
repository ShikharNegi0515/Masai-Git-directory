function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5; 
            if (success) {
                resolve("Fetched data successfully!");
            } else {
                reject("Network error occurred.");
            }
        }, 1000); 
    });
}

async function fetchDataHandler() {
    try {
      const result = await fetchData();
      console.log(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

fetchDataHandler();
