{/* <Box sx={{display: "flex", flexDirection: "column", width: "60%"}}>
          <article>
            <header>
              <box>
            	  <Link to='/' style={{textDecoration: 'none', width:'10%'}}>
                  <p>
                    <ArrowBackIcon style={{textDecoration: 'none'}} />
                    All posts
                  </p>
                </Link>
              </box>
            	<div className='headline'>{Article.headline}</div>
            	<sub>{Article.sub_title}</sub>
            	<div class="article-tags">
                <Box sx={{     
                 width: "100%", 
                 minHeight: "30%",
                 height: "30%", 
                 display: "flex", 
                 flexDirection: "row",
                 alignContent: "center",
                }}>
                {
                Array.isArray(Article.tags) ?
                  Article.tags.map(tag =>{
                    return(
                      <Box sx={{margin: "5px"}}>
                        <Chip style={{
                          backgroundColor: "#E0E0CE",
                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                          fontSize: "15px",
                          textDecoration: "none",
                        }}
                        label={tag}
                        />
                      </Box>
                    )
                  })
                :
                  <Box sx={{margin: "5px"}}>
                    <Chip style={{
                      backgroundColor: "#E0E0CE",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                      label={Article.tags}
                    />
                  </Box>
                }
                </Box>
            	</div>
            </header>
            <authHeader>
               <author>{`${reporter.first_name} ${reporter.last_name}`}</author>
     	         <dateline>{Utility.getDate(Article.date)}</dateline>
            </authHeader>
            <main>
     	        <div className='description'>
                {Article.article_description}
              </div>
              <body>
                {Article.article_body}
              </body>
            </main>
            </article>
          </Box> */}