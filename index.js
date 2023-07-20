const PD = require("probability-distributions");
const embeds = require('./embed.json')

const buckets = {}

// Using actual ChatGPT embeddings for the word "instrumental convergence"
const embeddings = embeds.data[0].embedding

/**
 * Generate a random vector based on beta distribution
 * https://statisticsblog.com/probability-distributions/#beta
 */
function getRandomVector (alpha, betaP, negativeRate) {
  const result = PD.rbeta(1536, alpha, betaP).map(value => {
    return Math.random() > negativeRate
      ? value
      : -value
  })

  return result
}

/**
 * Generate how similar vector arrays are.
 * -1 means no similarity
 * 1 means maximum similarity
 * https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
 * "The ratio between the covariance of two variables and the 
 * product of their standard deviations; thus, it is essentially
 * a normalized measurement of the covariance, such that the result
 * always has a value between −1 and 1"
 * 
 */
function pearsonCorrelation(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error('Arrays must have the same length');
  }

  const n = arr1.length;
  let sum1 = 0;
  let sum2 = 0;
  let sumSq1 = 0;
  let sumSq2 = 0;
  let pSum = 0;

  for (let i = 0; i < n; i++) {
    const x = arr1[i];
    const y = arr2[i];

    sum1 += x;
    sum2 += y;
    sumSq1 += x * x;
    sumSq2 += y * y;
    pSum += x * y;
  }

  const numerator = n * pSum - sum1 * sum2;
  const denominator = Math.sqrt((n * sumSq1 - sum1 * sum1) * (n * sumSq2 - sum2 * sum2));
  
  if (denominator === 0) {
    return 0; // Handle the case of zero denominator to avoid division by zero
  }

  const correlation = numerator / denominator;
  return correlation;
}

// Factors that drive beta distribution exploration

const alpha = 0
const betaP = 0
const negativeRate = 0

const alphaIteration = 0.1
const betaPIteration = 1
const negativeRateIteration = 0.1

const alphaLast = 5
const betaPLast = 100
const negativeRateLast = 1

// Beta distribution exploration

for (let a = 0; alpha + (a * alphaIteration) < alphaLast; a += 1) {
  Object.keys(buckets).sort().map(bucket => {
    console.log(`${bucket} - ${buckets[bucket].length}`)
  })
  console.log('================================================')


  for (let b = 0; betaP + (b * betaPIteration) < betaPLast; b += 1) {
    for (let n = 0; negativeRate + (n * negativeRateIteration) < negativeRateLast; n += 1) {
      //console.log([alpha + (a * alphaIteration), betaP + (b * betaPIteration), negativeRate + (n * negativeRateIteration)])
      const similarity = pearsonCorrelation(embeddings, getRandomVector(
        alpha + (a * alphaIteration),
        betaP + (b * betaPIteration),
        negativeRate + (n * negativeRateIteration)
      ))

      if (buckets[similarity.toFixed(3)] === undefined) {
        buckets[similarity.toFixed(3)] = []
      }

      buckets[similarity.toFixed(3)].push(`${a}-${b}-${n}`)
    }   
  }  
}

// Final output of the distributions and the settings needed to generate them

Object.keys(buckets).sort().map(bucket => {
    console.log(bucket)
    console.log(buckets[bucket])
  })
  console.log('================================================')