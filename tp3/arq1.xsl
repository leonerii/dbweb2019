<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <html>
                <head>
                    <title>Arqueosítios</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1>Arqueositios do NW Portugues</h1>
                    <h3>Indice (por concelho)</h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(preceding::CONCEL=./CONCEL)]">
                            <xsl:sort select="normalize-space(CONCEL)"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <!-- Estudar preceding e essas coisas -->
        <xsl:variable name="concelho" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <ol>
                <xsl:apply-templates select="//IDENTI[../CONCEL=$concelho]">
                    <xsl:sort select="."/>
                </xsl:apply-templates>
            </ol>
        </li>
    </xsl:template>
    
    <xsl:template match="IDENTI">
        <li><xsl:value-of select="."/></li>
    </xsl:template>
    
    <xsl:template match="text()" priority="-1"/>
    
</xsl:stylesheet>