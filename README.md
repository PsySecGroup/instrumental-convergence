# Instrumental Convergence

This code explores the ability of beta distributions to emulate ChatGPT vector embeddings. We generate random vectors and calculate their similarity using the Pearson correlation coefficient. The primary purpose is to investigate which beta distribution parameters have the best chance of emulating a ChatGPT vector embed.

## Getting Started

To run the code, make sure you have Node.js installed on your system. Additionally, ensure that the required libraries are installed by running the following command:

`npm install https://github.com/PsySecGroup/instrumental-convergence`

## Prerequisites

The embed.json file contains the 1,536 ChatGPT vector embeddings for the phrase "instrumental convergence." We choose this word because it is a standard argument for AI doomers.

Instrumental convergence allows for an open-ended defense of constraining AI. It derives this position from its reasoning. An example of instrumental convergence would be the industrial age. For example, you get involved with the industrial age because:

- You want cheaper goods
- You want more goods
- You want to reduce labor effort
- You think machines are cool
- You want to make money

These are five motives that rationalize why people engage in the industrial age. At the end of the industrial age, however, you end up with one outcome, no matter what your motives were: **a whole lot of pollution**

No one entered the industrial age with the intention of creating a pile of pollution, so the instrumentality of your choices converged into an outcome that was unpredictable or underplayed.

This is an open-ended argument that eliminates intentions and motives and allows for random number generators to act as agents. This project is designed to exploit this open-endedness of this argument to show its uselessness with regards to describing AI risk.

## Code Description

The code consists of the following main components:

**Random Vector Generation**: The `getRandomVector` function generates a random vector based on the beta distribution. The beta distribution parameters alpha, betaP, and negativeRate can be adjusted to explore different aspects of the distribution.

**Similarity Calculation**: The `pearsonCorrelation` function calculates the similarity between two vector arrays using the Pearson correlation coefficient. The similarity value ranges from -1 (no similarity) to 1 (maximum similarity).

**Beta Distribution Exploration**: The script explores the beta distribution by varying the parameters alpha, betaP, and negativeRate. It generates multiple random vectors and calculates their similarity to the provided embeddings for "instrumental convergence." The results are stored in the buckets object, categorized by similarity values.

## Outcomes

The highest similarity this code has generated to ChatGPT vector embeds is **11.6%**.  Intelligent interation can boost this signficiantly, especially since I am using `Math.random()`, the very worst random generator known to humanity.