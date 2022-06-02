const GRAPHQL_ENDPOINT = "https://api-dev.foodstyles.com/graphql";
const AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM0LCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU0MDg2MDY4LCJleHAiOjE2NTQ2OTA4Njh9.nfghVjmUUtkyangRTgnNZYylnqPziGQyKLfrHPd0zzcS59YSD7Bjg16Q6j3X2XdyxrktHtUc0zZeoB7wdJByMciRG9lOn9X9DUHfVdK0xlj3Bipz87cGPZ1OnqqENU7IdJpPBv62y4pb8tconE3G3vkXGxZfm6tyMgh1m6XZIQvo9zBeCzzVnuJXvnjXckwQB_qfwUykNmmaPIA-A43M72mb0c_QX0SPtZBrPPn8qjPtAzH5lrNbzJVAybAeZhpviv1CMIR_KPogaeUqmoJiZ3UZNv3aKlpIykir3grkugvmEPUCPspzLWJoYGR-pHlhE6ovWwdchkiXTjMm4kiRzQ";

export const fetchGraphql = async (query: string, variables?: any) => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
}