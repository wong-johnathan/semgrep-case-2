require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const getFindingsParams = () => {
  const dateString = new Date(process.env.DATE);
  const queryParams = { since: dateString.getTime() / 1000, page_size: 3000 };
  return Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");
};

const semgrepClient = axios.create({
  baseURL: "https://semgrep.dev/api/v1/",
  headers: { Authorization: `Bearer ${process.env.SEMGREP_APP_TOKEN}` },
});

const getDeployments = async () => {
  const axios = await semgrepClient.get("deployments");
  const data = axios.data;
  return data.deployments;
};

const getFindings = async (deploymentSlug) => {
  let findings = [];
  let page = 0;
  while (true) {
    const axios = await semgrepClient.get(
      `deployments/${deploymentSlug}/findings?page=${page}&${getFindingsParams()}`
    );
    if (axios.data.findings.length === 0) break;
    findings = [...axios.data.findings];
    page++;
  }
  return findings;
};

const start = async () => {
  console.log(`----Running script----`);
  console.log(`----Pulling all deployments----`);
  const deployments = await getDeployments();
  console.log(`----Found a total of ${deployments.length} deployments----`);
  for (let deployment of deployments) {
    console.log(`----Pulling findings from ${deployment.slug}----`);
    const deploymentSlug = deployment.slug;
    const findings = await getFindings(deploymentSlug);
    fs.writeFileSync(
      `./exports/${deploymentSlug}.json`,
      JSON.stringify(findings, null, 2)
    );
    console.log(
      `----Findings for ${deploymentSlug} saved in ./exports/${deploymentSlug}.json----`
    );
  }
};

start();
