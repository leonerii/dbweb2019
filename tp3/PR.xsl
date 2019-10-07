<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
<xsl:template match="/">

<html>
    <head>
        <title> Project Record: <xsl:value-of select="pr/metadata/keyname"/></title>

    </head>
    <body>     
        <h1>Project Record</h1>
        <p><b>Key Name: </b> <xsl:value-of select="pr/metadata/keyname"/></p>
        <p><b>Title: </b> <xsl:value-of select="pr/metadata/title"/></p>
        <p><b>Subtitle: </b> <xsl:value-of select="pr/metadata/subtitle"/></p>
        <p><b>BDate: </b> <xsl:value-of select="pr/metadata/bdate"/></p>
        <p><b>EDate: </b> <xsl:value-of select="pr/metadata/edate"/></p>
        <p><b>Supervisor: </b> <xsl:value-of select="pr/metadata/supervisor"/></p>

        <h2>WorkTeam</h2>
        <xsl:for-each select="pr/workteam/worker">
            <p><b>Name: </b> <xsl:value-of select="name"/></p>
            <p><b>ID: </b> <xsl:value-of select="identifier"/></p>
            <p><b>Email: </b> <xsl:value-of select="email"/></p>
            <p><b>GIT: </b> <xsl:value-of select="git"/></p>
        </xsl:for-each>

        <p><h2>Abstract</h2></p>
        <p><xsl:value-of select="pr/abstract"/></p>

        <p><h2>Deliverables</h2></p>
        <p><ul>
            <xsl:for-each select="pr/deliverables">
                <xsl:variable name="href" select="deliverable/@path"/>
                <li><a href="{$href}"> <xsl:value-of select="deliverable"/></a></li>
            </xsl:for-each>
        </ul></p>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>
