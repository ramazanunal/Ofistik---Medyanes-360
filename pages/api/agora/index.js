const { RtcTokenBuilder, RtcRole } = require("agora-token");

export default async function agoraTokenHandler(req, res) {
  if (req.method === "GET") {
    const { channelName, uid, userAccount } = req.query;
    if (!uid || uid === "") {
      return res.status(400).json({ error: "uid is required" });
    }
    if (!channelName || channelName === "") {
      return res.status(400).json({ error: "channelName is required" });
    }

    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
    const appCertificate = process.env.NEXT_PUBLIC_AGORA_APP_CERTIFICATE;
    const role = RtcRole.PUBLISHER;
    console.log("uid", uid);
    console.log("uid", process.env.NEXT_PUBLIC_AGORA_APP_ID);
    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      expirationTimeInSeconds,
      privilegeExpiredTs
    );

    return res.status(200).json({ token: tokenA });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
