<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQSITS">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Arqueosítios</title>
            </head>
            <body>
                <h2>Lista de Arqueosítios</h2>
                <xsl:apply-templates select="//ARQELEM">
                    <xsl:sort select="IDENTI"/>
                </xsl:apply-templates>
                
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <li>
            <a href="dataset/arq{count(preceding-sibling::*)+1}.xml">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>        
    </xsl:template>
    
</xsl:stylesheet>