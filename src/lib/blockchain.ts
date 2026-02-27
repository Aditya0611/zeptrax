// Simulated blockchain for certificate verification
export interface Block {
  index: number;
  timestamp: string;
  data: {
    certificateNumber: string;
    recipientName: string;
    courseName: string;
    issueDate: string;
  };
  previousHash: string;
  hash: string;
  nonce: number;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function calculateHash(block: Omit<Block, "hash">): Promise<string> {
  const data = `${block.index}${block.timestamp}${JSON.stringify(block.data)}${block.previousHash}${block.nonce}`;
  return sha256(data);
}

export async function mineBlock(
  index: number,
  data: Block["data"],
  previousHash: string,
  difficulty: number = 2
): Promise<Block> {
  const timestamp = new Date().toISOString();
  let nonce = 0;
  let hash = "";
  const prefix = "0".repeat(difficulty);

  do {
    nonce++;
    hash = await calculateHash({ index, timestamp, data, previousHash, nonce });
  } while (!hash.startsWith(prefix));

  return { index, timestamp, data, previousHash, hash, nonce };
}

export async function verifyBlock(block: Block): Promise<boolean> {
  const calculatedHash = await calculateHash({
    index: block.index,
    timestamp: block.timestamp,
    data: block.data,
    previousHash: block.previousHash,
    nonce: block.nonce,
  });
  return calculatedHash === block.hash;
}

export function generateCertificateNumber(): string {
  const prefix = "ZEPT";
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}
